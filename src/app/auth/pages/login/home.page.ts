import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { decodeJwtInterface } from '@auth/intefaces/auth';
import { AuthService } from '@auth/services/auth.service';
import { LoginService } from '@auth/services/login.service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonButtons,
  IonCardTitle,
  IonCardHeader,
} from '@ionic/angular/standalone';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ReactiveFormsModule,
    IonInput,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonButtons,
    RouterModule,
    IonCardTitle,
    IonCardHeader,
  ],
})
export class HomePage {
  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private loginSvc: LoginService,
    private authSvc: AuthService,
    private router: Router
  ) {}
  login() {
    if (this.form.valid) {
      this.loginSvc.login(this.form.value).subscribe((res) => {
        const decoded: decodeJwtInterface = jwtDecode(res.token);
        this.authSvc.setAuth({
          token: res.token,
          roles: decoded.roles,
          username: decoded.sub,
          email: decoded.email,
          exp: decoded.exp,
          iat: decoded.iat,
        });
        this.router.navigate(['notice/home']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
