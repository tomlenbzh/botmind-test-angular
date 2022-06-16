import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
// import { AuthenticationService } from '../../services/authentication.service';
// import { User } from 'src/app/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  private excludedUrls: Array<string>;

  constructor(private injector: Injector, private authService: AuthenticationService) {
    this.excludedUrls = ['login'];
  }

  /**
   * TokenInterceptor()
   * @param request,
   * @param next
   * Retrieves and injects access token in every new Http request
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthenticationService);
    const accessToken: string | null = this.authService.getAccessToken();

    if (this.checkExcludedUrl(request.url) === true) {
      request = request.clone({ setHeaders: { 'Content-Type': 'application/json' } });
    } else {
      if (accessToken) {
        request = request.clone({
          setHeaders: {
            'x-token': accessToken,
            'Content-Type': 'application/json',
            Authorization: 'Basic YXJ0c3BlcjpoVGsxZEE3ZmVBdDI='
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
