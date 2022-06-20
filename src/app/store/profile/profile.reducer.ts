import { createReducer, on } from '@ngrx/store';
import { IUser } from '@auth/utils/interfaces';
import {
  FETCH_PROFILE_ACTION,
  FETCH_PROFILE_SUCCESS_ACTION,
  FETCH_PROFILE_ERROR_ERROR,
  UPDATE_PROFILE_ACTION,
  UPDATE_PROFILE_SUCCESS_ACTION,
  UPDATE_PROFILE_ERROR_ACTION,
  DELETE_PROFILE_ACTION,
  DELETE_PROFILE_SUCCESS_ACTION,
  DELETE_PROFILE_ERROR_ACTION
} from './profile.actions';

export interface ProfileState {
  isLoading: boolean;
  profile: IUser | null;
}

export const initialState: ProfileState = {
  isLoading: false,
  profile: null
};

export const profileReducer = createReducer(
  initialState,
  on(FETCH_PROFILE_ACTION, (state: ProfileState): ProfileState => ({ ...state, isLoading: true })),
  on(
    FETCH_PROFILE_SUCCESS_ACTION,
    (state: ProfileState, { user }): ProfileState => ({ ...state, isLoading: false, profile: user })
  ),
  on(FETCH_PROFILE_ERROR_ERROR, (state: ProfileState): ProfileState => ({ ...state, isLoading: false })),
  on(UPDATE_PROFILE_ACTION, (state: ProfileState): ProfileState => ({ ...state, isLoading: true })),
  on(
    UPDATE_PROFILE_SUCCESS_ACTION,
    (state: ProfileState, { user }): ProfileState => ({ ...state, isLoading: false, profile: user })
  ),
  on(UPDATE_PROFILE_ERROR_ACTION, (state: ProfileState): ProfileState => ({ ...state, isLoading: false })),

  on(DELETE_PROFILE_ACTION, (state: ProfileState): ProfileState => ({ ...state, isLoading: true })),
  on(
    DELETE_PROFILE_SUCCESS_ACTION,
    (state: ProfileState): ProfileState => ({ ...state, isLoading: false, profile: null })
  ),
  on(DELETE_PROFILE_ERROR_ACTION, (state: ProfileState): ProfileState => ({ ...state, isLoading: false }))
);
