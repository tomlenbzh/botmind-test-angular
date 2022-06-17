import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

import { AuthState, authReducer } from './authentication/reducers/authentication.reducer';
import { ProfileState, profileReducer } from './profile/reducers/profile.reducer';

export interface AppState {
  auth: AuthState;
  profile: ProfileState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  profile: profileReducer
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
