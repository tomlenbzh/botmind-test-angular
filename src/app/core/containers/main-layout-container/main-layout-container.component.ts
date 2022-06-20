import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import jwt_decode from 'jwt-decode';

import { AuthHelper } from '@app/store/auth/auth.helper';
import { ProfileHelper } from '@app/store/profile/profile.helper';
import { IUser } from '@auth/utils/interfaces';

@Component({
  template: `<app-main-layout
    [profile]="profile | async"
    (langChanged)="changeLang($event)"
    (loggedOut)="logout()"
  ></app-main-layout>`
})
export class MainLayoutContainerComponent implements OnInit {
  profile!: Observable<IUser | null>;

  constructor(private authHelper: AuthHelper, private profileHelper: ProfileHelper) {}

  ngOnInit(): void {
    this.profile = this.profileHelper.profile();
    this.getAccessToken().subscribe((token: string | null) => {
      if (token) {
        const userId: number | undefined = this.decodeToken(token);
        userId && this.profileHelper.fetchProfile(userId);
      }
    });
  }

  /**
   * Updates user profile when language has changed.
   *
   * @param     { IUser }     profile
   */
  changeLang(profile: IUser): void {
    if (profile.id) this.profileHelper.updateProfile(profile.id, profile);
  }

  /**
   * Logs the user out of the application.
   */
  logout(): void {
    this.authHelper.logout();
  }

  /**
   * Returns the access token stored in localstorage if it exists.
   *
   * @returns { Observable<string | null> }
   */
  private getAccessToken(): Observable<string | null> {
    return of(this.authHelper.getAccessToken());
  }

  /**
   * Returns the user id from the acees token.
   *
   * @param     { string }      token
   * @returns   { number | undefined }
   */
  private decodeToken(token: string): number | undefined {
    const decoded: any = jwt_decode(token);
    const tokenUser: IUser = decoded?.user;
    return tokenUser.id;
  }
}
