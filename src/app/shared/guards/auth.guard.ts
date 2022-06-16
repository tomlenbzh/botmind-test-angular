import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  authRoutes = ['/auth/login', '/auth/signup'];

  constructor(private authService: AuthenticationService, public router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authRoutes.includes(state.url) || state.url === '') {
      if (!this.authService.getAccessToken()) {
        return true;
      } else {
        this.router.navigateByUrl('/app');
        return true;
      }
    } else {
      if (!this.authService.getAccessToken()) {
        this.router.navigateByUrl('/auth');
        return false;
      }

      return true;
    }
  }
}
