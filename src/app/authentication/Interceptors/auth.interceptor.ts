import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse && this.isSuccessResponse(event)) {
          this.snackBar.open('Login/Signup successful', 'Close', {
            duration: 2000,
          });
        }
      },
      (error: any) => {
        if (error instanceof HttpErrorResponse && !this.isSuccessResponse(error)) {
          // Handle error cases if needed
        }
      })
    );
  }

  private isSuccessResponse(response: HttpResponse<any> | HttpErrorResponse): boolean {
    return response.status >= 200 && response.status < 300;
  }
}
