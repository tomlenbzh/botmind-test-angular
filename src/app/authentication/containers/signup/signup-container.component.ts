import { Component } from '@angular/core';

@Component({
  selector: 'app-signup-container',
  template: '<app-signup></app-signup>'
})
export class SignupContainerComponent {
  signup(credentials: any): void {
    console.log('[SIGNUP]', credentials);
  }
}
