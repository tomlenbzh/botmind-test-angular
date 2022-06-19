import { ActionCreator, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

import { AuthState, authReducer } from './authentication/reducers/authentication.reducer';
import { ProfileState, profileReducer } from './profile/reducers/profile.reducer';
import { PostsState, postsReducer } from './posts/reducers/posts.reducers';
import { LOGIN_SUCCESS_ACTION, LOGOUT_ACTION } from './authentication/actions/authentications.actions';
import { Action, TypedAction } from '@ngrx/store/src/models';
import { AuthActionTypes } from './authentication/actions/authentications.actions.types';

export interface AppState {
  auth: AuthState;
  profile: ProfileState;
  posts: PostsState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  profile: profileReducer,
  posts: postsReducer
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [clearState] : [clearState];

export function clearState(reducer: (arg0: any, arg1: any) => any) {
  return (state: any, action: Action) => {
    if (action.type === AuthActionTypes.LOGOUT) state = undefined;
    return reducer(state, action);
  };
}
