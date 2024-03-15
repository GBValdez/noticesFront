import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable, catchError, finalize, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    public spinnerSvc: LoadingController,
    private authSvc: AuthService,
    private alertCtrl: AlertController
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers;
    if (this.authSvc.hasAuth())
      headers = req.headers.set(
        'Authorization',
        `Bearer ${this.authSvc.getAuth()?.token}`
      );
    const cloneRequest = req.clone({
      headers: headers,
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
          this.alertCtrl
            .create({
              header: 'Error',
              message: error.error.message,
              buttons: ['OK'],
            })
            .then((alert) => {
              alert.present();
            });
        }
        if (error.error.errors) {
          const errors: string[] = error.error.errors;
          const message = errors.join('\n');
          this.alertCtrl
            .create({
              header: 'Error',
              message: message,
              buttons: ['OK'],
            })
            .then((alert) => {
              alert.present();
            });
        }
        return throwError(error);
      }),

      finalize(async () => {
        (await spinner).dismiss();
      })
    );
  }
}
