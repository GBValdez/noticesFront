import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth, credentialsDto, loginResDto } from '@auth/intefaces/auth';
import { environment } from '@env/environment';
import { AES } from 'crypto-js';
import { BehaviorSubject, Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
// Servicio para la gestión de la autenticación
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  // Observable para la gestión de la autenticación
  authObs: BehaviorSubject<auth | null> = new BehaviorSubject<auth | null>(
    null
  );

  getObservable(): Observable<auth | null> {
    return this.authObs.asObservable();
  }
  nextAuth(auth: auth | null): void {
    this.authObs.next(auth);
  }
  // Método para revisar si el usuario tiene autenticación
  hasAuth(): boolean {
    return localStorage.getItem('auth') !== null;
  }
  // Método para autenticar un usuario
  setAuth(auth: auth): void {
    // Encriptamos el objeto de autenticación
    const authBody = AES.encrypt(
      JSON.stringify(auth),
      environment.key
    ).toString();
    // Guardamos el objeto de autenticación en el local storage
    localStorage.setItem('auth', authBody);
    // Emitimos el nuevo objeto de autenticación
    this.nextAuth(auth);
  }
  // Método para obtener la autenticación
  getAuth(): auth | null {
    // Obtenemos el objeto de autenticación del local storage
    const authBody = localStorage.getItem('auth') ?? '';
    // Verificamos si el objeto de autenticación no esta vacío
    if (authBody.trim() !== '') {
      // Desencriptamos el objeto de autenticación
      const auth = JSON.parse(
        AES.decrypt(authBody, environment.key).toString(CryptoJS.enc.Utf8)
      );
      // Retornamos el objeto de autenticación
      return auth;
    }
    return null;
  }
  // Método para remover la autenticación
  removeAuth(): void {
    localStorage.removeItem('auth');
    this.nextAuth(null);
    this.router.navigate(['/login']);
  }
}
