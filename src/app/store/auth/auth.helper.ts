import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN } from 'src/app/shared/constants/constants';
import { AppState } from 'src/app/store';
import { IUser } from '../../auth/utils/interfaces';
import { LOGIN_ACTION, LOGOUT_ACTION, RESET_AUTH_STATE_ACTION, SIGNUP_ACTION } from './auth.actions';
import { selectAuthErrorMessage, selectAuthLoading } from './auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthHelper {
  constructor(private store: Store<AppState>) {}

  isLoading(): Observable<boolean> {
    return this.store.pipe(select(selectAuthLoading));
  }

  errorMessage(): Observable<string | null> {
    return this.store.select(selectAuthErrorMessage);
  }

  login(credentials: IUser): void {
    this.store.dispatch(LOGIN_ACTION({ credentials }));
  }

  signup(credentials: IUser): void {
    this.store.dispatch(SIGNUP_ACTION({ credentials }));
  }

  resetAuthState(): void {
    this.store.dispatch(RESET_AUTH_STATE_ACTION());
  }

  logout(): void {
    this.store.dispatch(LOGOUT_ACTION());
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  clearToken(): void {
    localStorage.removeItem(ACCESS_TOKEN);
  }
}
