import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Observable, catchError, finalize, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    public spinnerSvc: LoadingController,
    private authSvc: AuthService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cloneRequest = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${this.authSvc.getAuth()?.token}`
      ),
    });
    const spinner = this.spinnerSvc.create({
      message: 'Loading...',
    });
    spinner.then((load) => {
      load.present();
    });
    return next.handle(cloneRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.authSvc.removeAuth();
        }
        if (error.error.message) {
          console.log(error.error.message);
        }
        if (error.error.errors) {
          console.log(error.error.errors);
        }
        return throwError(error);
      }),

      finalize(async () => {
        (await spinner).dismiss();
      })
    );
  }
}
