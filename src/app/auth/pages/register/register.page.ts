import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginService } from '@auth/services/login.service';
import { decodeJwtInterface } from '@auth/intefaces/auth';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class RegisterPage implements OnInit {
  form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(45)]],
    password: [
      '',
      [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
        ),
      ],
    ],
    email: [
      '',
      [Validators.required, Validators.maxLength(100), Validators.email],
    ],
    name: ['', [Validators.required, Validators.maxLength(100)]],
  });
  constructor(
    private fb: FormBuilder,
    private loginSvc: LoginService,
    private authSvc: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  register() {
    if (this.form.valid) {
      this.loginSvc.register(this.form.value).subscribe((res) => {
        const decoded: decodeJwtInterface = jwtDecode(res.token);
        this.authSvc.setAuth({
          token: res.token,
          roles: decoded.roles,
          username: decoded.sub,
          email: decoded.email,
          exp: decoded.exp,
          iat: decoded.iat,
        });
        this.alertCtrl
          .create({
            header: 'Success',
            message: 'Bienvenido al portal de noticias',
            buttons: ['OK'],
          })
          .then((alert) => {
            alert.present();
          });
        this.router.navigate(['home']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  ngOnInit() {}
}
