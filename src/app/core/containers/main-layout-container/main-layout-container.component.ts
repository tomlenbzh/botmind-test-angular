import { Component } from '@angular/core';
import { AuthenticationHelper } from 'src/app/store/authentication/helpers/authentication.helper';

@Component({
  template: `<app-main-layout (loggedOut)="logout()"></app-main-layout>`
})
export class MainLayoutContainerComponent {
  constructor(private authHelper: AuthenticationHelper) {}

  logout(): void {
    this.authHelper.logout();
  }
}
