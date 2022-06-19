import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AuthenticationHelper } from 'src/app/store/authentication/helpers/authentication.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  authRoutes = ['/auth/login', '/auth/signup'];

  constructor(private authHelper: AuthenticationHelper, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authRoutes.includes(state.url) || state.url === '') {
      if (!this.authHelper.getAccessToken()) {
        return true;
      } else {
        this.router.navigateByUrl('/app');
        return true;
      }
    } else {
      if (!this.authHelper.getAccessToken()) {
        this.router.navigateByUrl('/auth');
        return false;
      }

      return true;
    }
  }
}
