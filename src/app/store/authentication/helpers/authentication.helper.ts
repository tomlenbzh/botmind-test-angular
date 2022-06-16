import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { IUser } from '../../../authentication/utils/interfaces';
import { LOGIN_ACTION, LOGOUT_ACTION, SIGNUP_ACTION } from '../actions/authentications.actions';
import { selectAuthErrorMessage, selectAuthLoading } from '../selectors/authentication.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationHelper {
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

  logout(): void {
    this.store.dispatch(LOGOUT_ACTION());
  }
}
