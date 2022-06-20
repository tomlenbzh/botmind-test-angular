import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { Action } from '@ngrx/store/src/models';

import { environment } from '../../environments/environment';
import { AuthState, authReducer } from './auth/auth.reducer';
import { ProfileState, profileReducer } from './profile/profile.reducer';
import { PostsState, postsReducer } from './posts/posts.reducers';
import { AuthActionTypes } from './auth/auth.actions.types';
import { userReducer, UserState } from './user/user.reducer';

export interface AppState {
  auth: AuthState;
  profile: ProfileState;
  user: UserState;
  posts: PostsState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  profile: profileReducer,
  user: userReducer,
  posts: postsReducer
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [clearState] : [clearState];

export function clearState(reducer: (arg0: any, arg1: any) => any) {
  return (state: any, action: Action) => {
    if (action.type === AuthActionTypes.LOGOUT) state = undefined;
    return reducer(state, action);
  };
}
