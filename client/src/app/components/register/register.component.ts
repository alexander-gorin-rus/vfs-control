import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router,
  ) {}

  loading = false;

  registerForm = this.builder.group({
    firstName:this.builder.control('', Validators.compose([Validators.required])),
    lastName:this.builder.control('', Validators.compose([Validators.required])),
    login:this.builder.control('',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ])),
    password:this.builder.control('',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ])),
    isActive: this.builder.control(false),
  });
  
  async proceedRegistration () {
    if (this.registerForm.valid) {
      this.loading = true; 
      (await this.service.registerWorker(this.registerForm.value)).subscribe(res => {
        this.toastr.success('Вы успешно зарегистировались', 'Ваш профиль будет активирован после подтверждения администратором');
        this.router.navigate(['/login']);
        this.loading = false; 
      })
    } else {
      this.toastr.warning('Заполните все поля')
    }
  }
}
