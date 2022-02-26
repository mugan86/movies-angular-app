import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  construct() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error) => {
        let errorMessage = {
          type: '',
          message: '',
          status: 0,
        };

        if (error instanceof ErrorEvent) {
          // client-side error
          (errorMessage.type = 'Client / App'),
            (errorMessage.message = error.message);
        } else {
          // backend error
          (errorMessage.type = 'Backend / Server'),
            (errorMessage.message = error.message),
            (errorMessage.status = error.status);
        }

        // aquí podrías agregar código que muestre el error en alguna parte fija de la pantalla.
        // this.errorService.show(errorMessage);
        return throwError(() => errorMessage);
      })
    );
  }
}
