import { createReducer, on } from '@ngrx/store';
import { IListMeta, IPost } from 'src/app/posts/utils/interfaces';
import {
  CREATE_POST_ACTION,
  CREATE_POST_ERROR_ACTION,
  CREATE_POST_SUCCESS_ACTION,
  DELETE_POST_ACTION,
  DELETE_POST_ERROR_ACTION,
  DELETE_POST_SUCCESS_ACTION,
  FETCH_POSTS_ACTION,
  FETCH_POSTS_ERROR_ERROR,
  FETCH_POSTS_SUCCESS_ACTION,
  UPDATE_POST_ACTION,
  UPDATE_POST_ERROR_ACTION,
  UPDATE_POST_SUCCESS_ACTION
} from '../actions/posts.actions';

export interface PostsState {
  isLoading: boolean;
  posts: IPost[];
  meta: IListMeta | null;
}

export const initialState: PostsState = {
  isLoading: false,
  posts: [],
  meta: null
};

export const postsReducer = createReducer(
  initialState,
  on(FETCH_POSTS_ACTION, (state: PostsState): PostsState => ({ ...state, isLoading: true })),
  on(FETCH_POSTS_SUCCESS_ACTION, (state: PostsState, { posts, meta }): PostsState => {
    let newState = { ...state, meta, isLoading: false };
    newState.posts = [...newState.posts, ...posts];
    return newState;
  }),
  on(FETCH_POSTS_ERROR_ERROR, (state: PostsState): PostsState => ({ ...state, isLoading: false })),
  on(CREATE_POST_ACTION, (state: PostsState): PostsState => ({ ...state, isLoading: true })),
  on(CREATE_POST_SUCCESS_ACTION, (state: PostsState, { post }): PostsState => {
    let newState = { ...state, isLoading: false };
    newState.posts.unshift(post);
    return newState;
  }),
  on(CREATE_POST_ERROR_ACTION, (state: PostsState): PostsState => ({ ...state, isLoading: false })),

  on(UPDATE_POST_ACTION, (state: PostsState): PostsState => ({ ...state, isLoading: true })),
  on(
    UPDATE_POST_SUCCESS_ACTION,
    (state: PostsState, { post }): PostsState => ({
      ...state,
      isLoading: false,
      posts: state.posts?.map((statePost) => (statePost.id === post.id ? post : statePost))
    })
  ),
  on(UPDATE_POST_ERROR_ACTION, (state: PostsState): PostsState => ({ ...state, isLoading: false })),
  on(DELETE_POST_ACTION, (state: PostsState): PostsState => ({ ...state, isLoading: true })),
  on(DELETE_POST_SUCCESS_ACTION, (state: PostsState, { id }): PostsState => {
    const index = state.posts?.findIndex((p: IPost) => p.id === id);
    return {
      ...state,
      isLoading: false,
      posts: state.posts && index ? state.posts.splice(index, 1) : { ...state.posts }
    };
  }),
  on(DELETE_POST_ERROR_ACTION, (state: PostsState): PostsState => ({ ...state, isLoading: false }))
);
