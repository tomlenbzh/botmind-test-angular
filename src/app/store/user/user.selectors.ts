import { createSelector } from '@ngrx/store';
import { AppState } from '@app/store';
import { UserState } from './user.reducer';

export const userFeature = (state: AppState) => state.user;

export const selectUserLoading = createSelector(userFeature, (state: UserState) => state.isLoading);
export const selectUser = createSelector(userFeature, (state: UserState) => state.user);
