import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationHelper } from 'src/app/store/authentication/helpers/authentication.helper';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  private excludedUrls: Array<string>;

  constructor(private injector: Injector, private authHelper: AuthenticationHelper) {
    this.excludedUrls = ['login'];
  }

  /**
   * TokenInterceptor()
   * @param request,
   * @param next
   * Retrieves and injects access token in every new Http request
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authHelper = this.injector.get(AuthenticationHelper);
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
    const urlArray = this.excludedUrls.map((url) => {
      return RegExp(url, 'g').test(request) ? true : false;
    });
    return urlArray.includes(true) ? true : false;
  }
}
