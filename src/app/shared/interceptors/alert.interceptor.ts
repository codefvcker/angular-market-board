import { AlertService } from './../services/alert.service';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable()
export class AlertInterceptor implements HttpInterceptor {
  constructor(private alert: AlertService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('FROM INTERCEPT', req);
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        let errMsg = '';

        if (err.error instanceof ErrorEvent) {
          this.makeAlert(err.error.message);
          console.log('THIS IS CLIENT SIDE ERROR');
          errMsg = `Error msg is: ${err.error.message}`;
        } else {
          this.makeAlert(err.message);
          console.log('this is server side ERROR');
          this.alert.danger(err.message);
          errMsg = `Err msg is: ${err.message}, err status is: ${err.status}`;
        }
        console.log('ERROR MESSAGE FINALLY IS ', errMsg);
        return throwError(errMsg);
      })
    );
  }

  makeAlert(text: string) {
    this.alert.danger(text);
  }
}
