import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth, credentialsDto, loginResDto } from '@auth/intefaces/auth';
import { environment } from '@env/environment';
import { AES } from 'crypto-js';
import { BehaviorSubject, Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  authObs: BehaviorSubject<auth | null> = new BehaviorSubject<auth | null>(
    null
  );

  getObservable(): Observable<auth | null> {
    return this.authObs.asObservable();
  }
  nextAuth(auth: auth | null): void {
    this.authObs.next(auth);
  }
  //make hasAuth
  hasAuth(): boolean {
    return localStorage.getItem('auth') !== null;
  }
  //make setAuth function
  setAuth(auth: auth): void {
    const authBody = AES.encrypt(
      JSON.stringify(auth),
      environment.key
    ).toString();
    localStorage.setItem('auth', authBody);
    this.nextAuth(auth);
  }
  //make getAuth function
  getAuth(): auth | null {
    const authBody = localStorage.getItem('auth') ?? '';
    if (authBody.trim() !== '') {
      const auth = JSON.parse(
        AES.decrypt(authBody, environment.key).toString(CryptoJS.enc.Utf8)
      );
      return auth;
    }
    return null;
  }
  //make removeAuth function
  removeAuth(): void {
    localStorage.removeItem('auth');
    this.nextAuth(null);
    this.router.navigate(['/login']);
  }
}
