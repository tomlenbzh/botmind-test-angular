import { createReducer, on } from '@ngrx/store';
import { IUser } from 'src/app/authentication/utils/interfaces';
import {
  LOGIN_ACTION,
  LOGIN_ERROR_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGOUT_ACTION,
  SIGNUP_ACTION,
  SIGNUP_ERROR_ACTION,
  SIGNUP_SUCCESS_ACTION
} from '../actions/authentications.actions';

export interface AuthState {
  isLoading: boolean;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  isLoading: false,
  errorMessage: null
};

export const authReducer = createReducer(
  initialState,
  on(
    LOGIN_ACTION,
    (state: AuthState): AuthState => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    LOGIN_SUCCESS_ACTION,
    (state: AuthState, { user }): AuthState => ({
      ...state,
      isLoading: false,
      errorMessage: null
    })
  ),
  on(
    LOGIN_ERROR_ACTION,
    (state: AuthState, { error }): AuthState => ({
      ...state,
      isLoading: false,
      errorMessage: error.error.message
    })
  ),
  on(LOGOUT_ACTION, (): AuthState => initialState),
  on(
    SIGNUP_ACTION,
    (state: AuthState): AuthState => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    SIGNUP_SUCCESS_ACTION,
    (state: AuthState): AuthState => ({
      ...state,
      isLoading: false,
      errorMessage: null
    })
  ),
  on(
    SIGNUP_ERROR_ACTION,
    (state: AuthState, { error }): AuthState => ({
      ...state,
      isLoading: false,
      errorMessage: error.error.message
    })
  )
);
