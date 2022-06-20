import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IUser } from '@auth/utils/interfaces';
import { userActionTypes } from './user.actions.types';

/**
 * FETCH ACTIONS
 */
export const FETCH_USER_ACTION = createAction(userActionTypes.FETCH_USER, props<{ id: number }>());
export const FETCH_USER_SUCCESS_ACTION = createAction(userActionTypes.FETCH_USER_SUCCESS, props<{ user: IUser }>());
export const FETCH_USER_ERROR_ACTION = createAction(
  userActionTypes.FETCH_USER_ERROR,
  props<{ error: HttpErrorResponse }>()
);

/**
 * UPDATE ACTIONS
 */
export const UPDATE_USER_ACTION = createAction(userActionTypes.UPDATE_USER, props<{ id: number; user: IUser }>());
export const UPDATE_USER_SUCCESS_ACTION = createAction(userActionTypes.UPDATE_USER_SUCCESS, props<{ user: IUser }>());
export const UPDATE_USER_ERROR_ACTION = createAction(
  userActionTypes.UPDATE_USER_ERROR,
  props<{ error: HttpErrorResponse }>()
);
