import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { IUser } from '@auth/utils/interfaces';
import { UserService } from '@app/services/users/user.service';
import {
  FETCH_USER_ACTION,
  FETCH_USER_SUCCESS_ACTION,
  FETCH_USER_ERROR_ACTION,
  UPDATE_USER_ACTION,
  UPDATE_USER_SUCCESS_ACTION,
  UPDATE_USER_ERROR_ACTION
} from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  fetchUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FETCH_USER_ACTION),
      exhaustMap((action) =>
        this.userService.fetchUser(action.id).pipe(
          map((user: IUser) => FETCH_USER_SUCCESS_ACTION({ user })),
          catchError((error) => of(FETCH_USER_ERROR_ACTION({ error })))
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UPDATE_USER_ACTION),
      exhaustMap((action) =>
        this.userService.updateUser(action.id, action.user).pipe(
          map((user: IUser) => UPDATE_USER_SUCCESS_ACTION({ user })),
          catchError((error) => of(UPDATE_USER_ERROR_ACTION({ error })))
        )
      )
    );
  });
}
