import { Component } from '@angular/core';
import { ILoginCredentials } from '../../utils/interfaces';

@Component({
  selector: 'app-login-container',
  template: '<app-login (loginClicked)="login($event)"></app-login>'
})
export class LoginContainerComponent {
  login(credentials: ILoginCredentials): void {
    console.log('[LOGIN]', credentials);
  }
}
