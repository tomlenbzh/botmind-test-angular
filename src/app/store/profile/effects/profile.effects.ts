import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { IUser } from 'src/app/authentication/utils/interfaces';
import { ProfileService } from 'src/app/services/users/profile.service';
import {
  DELETE_PROFILE_ACTION,
  DELETE_PROFILE_ERROR_ACTION,
  DELETE_PROFILE_SUCCESS_ACTION,
  FETCH_PROFILE_ACTION,
  FETCH_PROFILE_ERROR_ERROR,
  FETCH_PROFILE_SUCCESS_ACTION,
  UPDATE_PROFILE_ACTION,
  UPDATE_PROFILE_ERROR_ACTION,
  UPDATE_PROFILE_SUCCESS_ACTION
} from '../actions/profile.actions';

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private profileService: ProfileService) {}

  fetchProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FETCH_PROFILE_ACTION),
      exhaustMap((action) =>
        this.profileService.fetchProfile(action.id).pipe(
          map((profile: IUser) => {
            return FETCH_PROFILE_SUCCESS_ACTION({ profile });
          }),
          catchError((error) => of(FETCH_PROFILE_ERROR_ERROR({ error })))
        )
      )
    );
  });

  updateProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UPDATE_PROFILE_ACTION),
      exhaustMap((action) =>
        this.profileService.updateProfile(action.id, action.profile).pipe(
          map((profile: IUser) => {
            return UPDATE_PROFILE_SUCCESS_ACTION({ profile });
          }),
          catchError((error) => of(UPDATE_PROFILE_ERROR_ACTION({ error })))
        )
      )
    );
  });

  deleteProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DELETE_PROFILE_ACTION),
      exhaustMap((action) =>
        this.profileService.deletProfile(action.id).pipe(
          map(() => DELETE_PROFILE_SUCCESS_ACTION()),
          catchError((error) => of(DELETE_PROFILE_ERROR_ACTION({ error })))
        )
      )
    );
  });

  // loginSuccess$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(LOGIN_SUCCESS_ACTION),
  //       tap((action) => {
  //         this.authService.setAccessToken(action.token);
  //         this.router.navigateByUrl('/app');
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );

  // loginError$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(LOGIN_ERROR_ACTION),
  //       tap(() => this.authService.clearToken())
  //     );
  //   },
  //   {
  //     dispatch: false
  //   }
  // );

  // logout$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(LOGOUT_ACTION),
  //       tap(() => {
  //         this.authService.clearToken();
  //         this.router.navigateByUrl('/auth');
  //       })
  //     );
  //   },
  //   {
  //     dispatch: false
  //   }
  // );

  // signup$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(SIGNUP_ACTION),
  //     exhaustMap((action) =>
  //       this.authService.signUp(action.credentials).pipe(
  //         map((user: IUser) => {
  //           const credentials = { ...user, password: action.credentials.password };
  //           return SIGNUP_SUCCESS_ACTION({ credentials });
  //         }),
  //         catchError((error) => of(SIGNUP_ERROR_ACTION({ error })))
  //       )
  //     )
  //   );
  // });

  // signupSuccess$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(SIGNUP_SUCCESS_ACTION),
  //       tap(({ credentials }) => this.authHelper.login(credentials))
  //     );
  //   },
  //   { dispatch: false }
  // );
}
