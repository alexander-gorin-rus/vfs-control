import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { BrokerMessages } from '@app/shared/broker-messages';
import { SERVICE_NAME } from '@app/shared/services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(SERVICE_NAME.AUTH_SERVICE)
    private readonly authService: ClientProxy,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'http') {
      return false;
    }

    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if (!authHeader) return false;

    const authHeaderParts = (authHeader as string).split(' ');

    if (authHeaderParts.length !== 2) return false;

    const [, jwt] = authHeaderParts;

    return this.authService.send({ cmd: BrokerMessages.VERIFY_JWT }, { jwt }).pipe(
      switchMap(({ exp }) => {
        if (!exp) return of(false);
  
        const TOKEN_EXP_MS = exp * 1000;
  
        const isJwtValid = Date.now() < TOKEN_EXP_MS;
        return of(isJwtValid);
      }),
      catchError(() => {
        throw new UnauthorizedException();
      }),
    );
  }
}
