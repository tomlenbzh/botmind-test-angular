import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ACCESS_TOKEN } from 'src/app/authentication/utils/constants/authentication.constants';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: Error) => {
        if (error instanceof HttpErrorResponse && error.status === 401 && !this.router.url.includes('/auth')) {
          this.router.navigateByUrl('/auth');
          localStorage.removeItem(ACCESS_TOKEN);
        }

        return throwError(() => error);
      })
    );
  }
}
