import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IUser } from '@auth/utils/interfaces';
import { ProfileActionTypes } from './profile.actions.types';

export const FETCH_PROFILE_ACTION = createAction(ProfileActionTypes.FETCH_PROFILE, props<{ id: number }>());
export const FETCH_PROFILE_SUCCESS_ACTION = createAction(
  ProfileActionTypes.FETCH_PROFILE_SUCCESS,
  props<{ user: IUser }>()
);
export const FETCH_PROFILE_ERROR_ERROR = createAction(
  ProfileActionTypes.FETCH_PROFILE_ERROR,
  props<{ error: HttpErrorResponse }>()
);
export const UPDATE_PROFILE_ACTION = createAction(
  ProfileActionTypes.UPDATE_PROFILE,
  props<{ id: number; user: IUser }>()
);
export const UPDATE_PROFILE_SUCCESS_ACTION = createAction(
  ProfileActionTypes.UPDATE_PROFILE_SUCCESS,
  props<{ user: IUser }>()
);
export const UPDATE_PROFILE_ERROR_ACTION = createAction(
  ProfileActionTypes.UPDATE_PROFILE_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export const DELETE_PROFILE_ACTION = createAction(ProfileActionTypes.DELETE_PROFILE, props<{ id: number }>());
export const DELETE_PROFILE_SUCCESS_ACTION = createAction(ProfileActionTypes.DELETE_PROFILE_SUCCESS);
export const DELETE_PROFILE_ERROR_ACTION = createAction(
  ProfileActionTypes.DELETE_PROFILE_ERROR,
  props<{ error: HttpErrorResponse }>()
);
