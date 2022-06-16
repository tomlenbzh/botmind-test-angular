import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/authentication/utils/interfaces';
import { AuthActionTypes } from './authentications.actions.types';

export const LOGIN_ACTION = createAction(AuthActionTypes.LOGIN, props<{ credentials: IUser }>());
export const LOGIN_SUCCESS_ACTION = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ token: string; user: IUser }>()
);
export const LOGIN_ERROR_ACTION = createAction(AuthActionTypes.LOGIN_ERROR, props<{ error: HttpErrorResponse }>());
export const LOGOUT_ACTION = createAction(AuthActionTypes.LOGOUT);
export const LOGOUT_BACK_IN_ACTION = createAction(AuthActionTypes.LOG_BACK_IN);

export const SIGNUP_ACTION = createAction(AuthActionTypes.SIGNUP, props<{ credentials: IUser }>());
export const SIGNUP_SUCCESS_ACTION = createAction(AuthActionTypes.SIGNUP_SUCCESS, props<{ credentials: IUser }>());
export const SIGNUP_ERROR_ACTION = createAction(AuthActionTypes.SIGNUP_ERROR, props<{ error: HttpErrorResponse }>());
