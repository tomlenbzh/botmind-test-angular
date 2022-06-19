import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { IUser } from 'src/app/authentication/utils/interfaces';
import { ProfileService } from 'src/app/services/users/profile.service';
import { LOGOUT_ACTION } from '../../authentication/actions/authentications.actions';
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
  constructor(private actions$: Actions, private profileService: ProfileService, private router: Router) {}

  fetchProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FETCH_PROFILE_ACTION),
      exhaustMap((action) =>
        this.profileService.fetchProfile(action.id).pipe(
          map((user: IUser) => {
            return FETCH_PROFILE_SUCCESS_ACTION({ user });
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
        this.profileService.updateProfile(action.id, action.user).pipe(
          map((user: IUser) => {
            return UPDATE_PROFILE_SUCCESS_ACTION({ user });
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

  deleteProfileSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DELETE_PROFILE_SUCCESS_ACTION),
      map(() => LOGOUT_ACTION())
    );
  });
}
