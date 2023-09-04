import { UserEntity } from '@app/shared/entities/user.entity';
import { NewUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';

export interface IAuthServiceInterface {
  getWorkers(): Promise<UserEntity[]>;
  findByLogin(login: string): Promise<UserEntity>;
  findWorkerById(id: string | number): Promise<UserEntity>;
  hashPassword(password: string): Promise<string>;
  register(newUser: Readonly<NewUserDto>): Promise<UserEntity>;
  doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean>;
  validateUser(
    login: string,
    password: string,
    active: boolean,
    isAdmin: boolean,
    isMaster: boolean,
  ): Promise<UserEntity>;
  login(existingUser: Readonly<LoginUserDto>);
  verifyJwt(jwt: string): Promise<{ exp: number }>;
}
