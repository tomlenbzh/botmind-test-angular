import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { AuthState } from './auth.reducer';

export const authFeature = (state: AppState) => state.auth;

export const selectAuthLoading = createSelector(authFeature, (state: AuthState) => state.isLoading);
export const selectAuthErrorMessage = createSelector(authFeature, (state: AuthState) => state?.errorMessage);
