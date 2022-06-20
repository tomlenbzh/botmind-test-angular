import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHelper } from '@store/auth/auth.helper';
import { IUser } from '../../utils/interfaces';

@Component({
  selector: 'app-signup-container',
  template: `<app-signup
    [isLoading]="isLoading | async"
    [errorMessage]="errorMessage | async"
    (signUpClicked)="signup($event)"
  ></app-signup>`
})
export class SignupContainerComponent implements OnInit {
  isLoading!: Observable<boolean | null>;
  errorMessage!: Observable<string | null>;

  constructor(private authHelper: AuthHelper) {}

  ngOnInit(): void {
    this.authHelper.resetAuthState();
    this.isLoading = this.authHelper.isLoading();
    this.errorMessage = this.authHelper.errorMessage();
  }

  /**
   * Sends user's credentials to signup action.
   *
   * @param     { IUser }      credentials
   */
  signup(credentials: IUser): void {
    this.authHelper.signup(credentials);
  }
}
