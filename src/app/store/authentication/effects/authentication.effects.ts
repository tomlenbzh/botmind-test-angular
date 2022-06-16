import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, tap } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { IUser, LoginInfo } from 'src/app/authentication/utils/interfaces';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ACCESS_TOKEN } from '../../../authentication/utils/constants/authentication.constants';
import {
  LOGIN_ACTION,
  LOGIN_ERROR_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGOUT_ACTION,
  SIGNUP_ACTION,
  SIGNUP_ERROR_ACTION,
  SIGNUP_SUCCESS_ACTION
} from '../actions/authentications.actions';
import { AuthenticationHelper } from '../helpers/authentication.helper';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private authHelper: AuthenticationHelper,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOGIN_ACTION),
      exhaustMap((action) =>
        this.authService.login(action.credentials).pipe(
          map((loginInfo: LoginInfo) => {
            return LOGIN_SUCCESS_ACTION(loginInfo);
          }),
          catchError((error) => of(LOGIN_ERROR_ACTION({ error })))
        )
      )
    );
  });

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LOGIN_SUCCESS_ACTION),
        tap((action) => {
          this.authService.setAccessToken(action.token);
          this.router.navigateByUrl('/app');
        })
      );
    },
    { dispatch: false }
  );

  loginError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LOGIN_ERROR_ACTION),
        tap(() => this.authService.clearToken())
      );
    },
    {
      dispatch: false
    }
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LOGOUT_ACTION),
        tap(() => {
          this.authService.clearToken();
          this.router.navigateByUrl('/auth');
        })
      );
    },
    {
      dispatch: false
    }
  );

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SIGNUP_ACTION),
      exhaustMap((action) =>
        this.authService.signUp(action.credentials).pipe(
          map((user: IUser) => {
            const credentials = { ...user, password: action.credentials.password };
            return SIGNUP_SUCCESS_ACTION({ credentials });
          }),
          catchError((error) => of(SIGNUP_ERROR_ACTION({ error })))
        )
      )
    );
  });

  signupSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SIGNUP_SUCCESS_ACTION),
        tap(({ credentials }) => this.authHelper.login(credentials))
      );
    },
    { dispatch: false }
  );
}
