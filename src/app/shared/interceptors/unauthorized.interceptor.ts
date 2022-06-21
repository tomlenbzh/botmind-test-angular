import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ACCESS_TOKEN } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  /**
   * Logs the user out when a 401 error is returned.
   *
   * @param     { HttpRequest<any> }      request
   * @param     { HttpHandler }           next
   * @returns   { Observable<HttpEvent<any>> }
   */
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
