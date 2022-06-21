import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthHelper } from '@app/store/auth/auth.helper';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  private excludedUrls: Array<string>;

  constructor(private injector: Injector, private authHelper: AuthHelper) {
    this.excludedUrls = ['login', 'signup'];
  }

  /**
   * Retrieves and injects access token in every new Http request save the authentication related ones.
   *
   * @param     { HttpRequest<any> }      request
   * @param     { HttpHandler }           next
   * @returns   { Observable<HttpEvent<any>> }
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authHelper = this.injector.get(AuthHelper);
    const accessToken: string | null = this.authHelper.getAccessToken();

    if (this.checkExcludedUrl(request.url) === true) {
      request = request.clone({ setHeaders: { 'Content-Type': 'application/json' } });
    } else {
      if (accessToken) {
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        });
      }
    }
    return next.handle(request);
  }

  private checkExcludedUrl(request: string): boolean {
    const urlArray = this.excludedUrls.map((url) => RegExp(url, 'g').test(request));
    return urlArray.includes(true) ? true : false;
  }
}
