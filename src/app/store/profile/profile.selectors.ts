import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ProfileState } from './profile.reducer';

export const profileFeature = (state: AppState) => state.profile;

export const selectProfileLoading = createSelector(profileFeature, (state: ProfileState) => state.isLoading);
export const selectProfile = createSelector(profileFeature, (state: ProfileState) => state.profile);
