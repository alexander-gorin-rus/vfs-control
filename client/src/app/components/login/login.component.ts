import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ROUTE_PATHS } from 'src/app/shared/paths';
import { Roles } from 'src/app/shared/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  loading = false;

  loginForm = this.builder.group({
    login:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.required),
  });
  
  navigateByRole(role: Roles): void {
    switch (role) {
      case Roles.master:
        this.router.navigate([ROUTE_PATHS.Master]);
        break;
      case Roles.excavator_operator:
        this.router.navigate([ROUTE_PATHS.Operator]);
        break;
      case Roles.fuel_attendant:
        this.router.navigate([ROUTE_PATHS.Fueler]);
        break;
      case Roles.director:
        this.router.navigate([ROUTE_PATHS.Director]);
        break;
      default:
        this.router.navigate([ROUTE_PATHS.Default]);
        break;
    }
  }
  
  async proceedLogin () {
    if (this.loginForm.valid) {
      this.loading = true; 
      (await this.service.loginWorker(this.loginForm.value)).subscribe((res: any) => {
        
        this.toastr.success('Вы успешно авторизовались');

        const token = res.token;

        const userRole = res.user.role;

        this.service.setRole(userRole);

        this.cookieService.set('token', token);

        this.navigateByRole(userRole);
        this.loading = false;  
      }, (err) => {
        console.log(err);
      })
    } else {
      this.toastr.warning('Что-то пошло не так')
    }
  }
}
