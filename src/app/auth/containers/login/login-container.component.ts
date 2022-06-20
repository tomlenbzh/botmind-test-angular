import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHelper } from '@store/auth/auth.helper';
import { IUser } from '../../utils/interfaces';

@Component({
  selector: 'app-login-container',
  template: `<app-login
    [isLoading]="isLoading | async"
    [errorMessage]="errorMessage | async"
    (loginClicked)="login($event)"
  ></app-login>`
})
export class LoginContainerComponent implements OnInit {
  isLoading!: Observable<boolean | null>;
  errorMessage!: Observable<string | null>;

  constructor(private authHelper: AuthHelper) {}

  ngOnInit(): void {
    this.authHelper.resetAuthState();
    this.isLoading = this.authHelper.isLoading();
    this.errorMessage = this.authHelper.errorMessage();
  }

  /**
   * Sends user's credentials to login action.
   *
   * @param     { IUser }      credentials
   */
  login(credentials: IUser): void {
    this.authHelper.login(credentials);
  }
}
