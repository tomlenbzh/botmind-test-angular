import { createReducer, on } from '@ngrx/store';
import { IUser } from '@auth/utils/interfaces';
import {
  FETCH_USER_ACTION,
  FETCH_USER_SUCCESS_ACTION,
  FETCH_USER_ERROR_ACTION,
  UPDATE_USER_ACTION,
  UPDATE_USER_SUCCESS_ACTION,
  UPDATE_USER_ERROR_ACTION
} from './user.actions';

export interface UserState {
  isLoading: boolean;
  user: IUser | null;
}

export const initialState: UserState = {
  isLoading: false,
  user: null
};

export const userReducer = createReducer(
  initialState,
  on(FETCH_USER_ACTION, (state: UserState): UserState => ({ ...state, isLoading: true })),
  on(FETCH_USER_SUCCESS_ACTION, (state: UserState, { user }): UserState => ({ ...state, isLoading: false, user })),
  on(FETCH_USER_ERROR_ACTION, (state: UserState): UserState => ({ ...state, isLoading: false })),
  on(UPDATE_USER_ACTION, (state: UserState): UserState => ({ ...state, isLoading: true })),
  on(UPDATE_USER_SUCCESS_ACTION, (state: UserState, { user }): UserState => ({ ...state, isLoading: false, user })),
  on(UPDATE_USER_ERROR_ACTION, (state: UserState): UserState => ({ ...state, isLoading: false }))
);
