import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthenticationHelper } from 'src/app/store/authentication/helpers/authentication.helper';
import { ProfileHelper } from 'src/app/store/profile/helpers/profile.helper';
import jwt_decode from 'jwt-decode';
import { IUser } from 'src/app/authentication/utils/interfaces';

@Component({
  template: `<app-main-layout (loggedOut)="logout()"></app-main-layout>`
})
export class MainLayoutContainerComponent implements OnInit {
  constructor(private authHelper: AuthenticationHelper, private profileHelper: ProfileHelper) {}

  ngOnInit(): void {
    this.getAccessToken().subscribe((token: string | null) => {
      if (token) {
        const userId: number | undefined = this.decodeToken(token);
        userId && this.profileHelper.fetchProfile(userId);
      }
    });
  }

  logout(): void {
    this.authHelper.logout();
  }

  private getAccessToken(): Observable<string | null> {
    return of(this.authHelper.getAccessToken());
  }

  private decodeToken(token: string): number | undefined {
    const decoded: any = jwt_decode(token);
    const tokenUser: IUser = decoded?.user;
    return tokenUser.id;
  }
}
