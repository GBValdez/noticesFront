import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { credentialsDto, loginResDto } from '@auth/intefaces/auth';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlBase: string = environment.api;
  constructor(private httpClient: HttpClient) {}
  login(credentials: credentialsDto): Observable<loginResDto> {
    return this.httpClient.post<loginResDto>(
      `${this.urlBase}/auth/login`,
      credentials
    );
  }
}
