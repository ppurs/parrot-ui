import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { ErrorToastComponent } from "./components/shared/error-toast/error-toast.component";
import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from "rxjs";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastMsg: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(error => {
      if (error.status !== 401) {
        this.toastMsg.openFromComponent(ErrorToastComponent, {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: 5000,
            panelClass: 'error-toast-panel'
          }
        );
      }
      return throwError(() => error);
    }));
    
  }

}