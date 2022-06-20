import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { IUser } from '@auth/utils/interfaces';
import { UserService } from '@app/services/users/user.service';
import { LOGOUT_ACTION } from '../auth/auth.actions';
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
} from './profile.actions';

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private userService: UserService, private router: Router) {}

  fetchProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FETCH_PROFILE_ACTION),
      exhaustMap((action) =>
        this.userService.fetchUser(action.id).pipe(
          map((user: IUser) => FETCH_PROFILE_SUCCESS_ACTION({ user })),
          catchError((error) => of(FETCH_PROFILE_ERROR_ERROR({ error })))
        )
      )
    );
  });

  updateProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UPDATE_PROFILE_ACTION),
      exhaustMap((action) =>
        this.userService.updateUser(action.id, action.user).pipe(
          map((user: IUser) => UPDATE_PROFILE_SUCCESS_ACTION({ user })),
          catchError((error) => of(UPDATE_PROFILE_ERROR_ACTION({ error })))
        )
      )
    );
  });

  deleteProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DELETE_PROFILE_ACTION),
      exhaustMap((action) =>
        this.userService.deletUser(action.id).pipe(
          map(() => DELETE_PROFILE_SUCCESS_ACTION()),
          catchError((error) => of(DELETE_PROFILE_ERROR_ACTION({ error })))
        )
      )
    );
  });

  deleteProfileSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DELETE_PROFILE_SUCCESS_ACTION),
      map(() => LOGOUT_ACTION())
    );
  });
}
