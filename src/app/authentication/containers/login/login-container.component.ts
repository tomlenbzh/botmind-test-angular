import { Component, OnInit } from '@angular/core';
import { IUser } from '../../utils/interfaces';
import { Observable } from 'rxjs';
import { AuthenticationHelper } from '../../../store/authentication/helpers/authentication.helper';

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

  constructor(private authHelper: AuthenticationHelper) {}

  ngOnInit(): void {
    this.isLoading = this.authHelper.isLoading();
    this.errorMessage = this.authHelper.errorMessage();
  }

  login(credentials: IUser): void {
    this.authHelper.login(credentials);
  }
}
