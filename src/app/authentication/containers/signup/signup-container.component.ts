import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationHelper } from '../../../store/authentication/helpers/authentication.helper';
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

  constructor(private authHelper: AuthenticationHelper) {}

  ngOnInit(): void {
    this.isLoading = this.authHelper.isLoading();
    this.errorMessage = this.authHelper.errorMessage();
  }

  signup(credentials: IUser): void {
    this.authHelper.signup(credentials);
  }
}
