import { createReducer, on } from '@ngrx/store';
import { IListMeta, IPost } from '@posts/utils/interfaces';
import {
  COMMENT_POSTS_ACTION,
  COMMENT_POSTS_ERROR_ACTION,
  COMMENT_POSTS_SUCCESS_ACTION,
  CREATE_POST_ACTION,
  CREATE_POST_ERROR_ACTION,
  CREATE_POST_SUCCESS_ACTION,
  DELETE_POST_ACTION,
  DELETE_POST_ERROR_ACTION,
  DELETE_POST_SUCCESS_ACTION,
  FETCH_POSTS_ACTION,
  FETCH_POSTS_ERROR_ERROR,
  FETCH_POSTS_SUCCESS_ACTION,
  LIKE_POST_ACTION,
  LIKE_POST_ERROR_ACTION,
  LIKE_POST_SUCCESS_ACTION,
  REMOVE_LIKE_POST_ACTION,
  REMOVE_LIKE_POST_ERROR_ACTION,
  REMOVE_LIKE_POST_SUCCESS_ACTION,
  RESET_POSTS_STATE_ACTION,
  UPDATE_POST_ACTION,
  UPDATE_POST_ERROR_ACTION,
  UPDATE_POST_SUCCESS_ACTION
} from './posts.actions';

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
    const newPosts = state.posts;
    newPosts.splice(index, 1);

    const newState = {
      ...state,
      isLoading: false,
      posts: index ? newPosts : [...state.posts]
    };

    return newState;
  }),
  on(DELETE_POST_ERROR_ACTION, (state: PostsState): PostsState => ({ ...state, isLoading: false })),
  on(LIKE_POST_ACTION, (state: PostsState): PostsState => ({ ...state })),
  on(
    LIKE_POST_SUCCESS_ACTION,
    (state: PostsState, { post }): PostsState => ({
      ...state,
      posts: state.posts?.map((statePost) =>
        statePost.id === post.id ? { ...statePost, likes: post.likes } : statePost
      )
    })
  ),
  on(LIKE_POST_ERROR_ACTION, (state: PostsState): PostsState => ({ ...state })),
  on(REMOVE_LIKE_POST_ACTION, (state: PostsState): PostsState => ({ ...state })),
  on(
    REMOVE_LIKE_POST_SUCCESS_ACTION,
    (state: PostsState, { post }): PostsState => ({
      ...state,
      posts: state.posts?.map((statePost) =>
        statePost.id === post.id ? { ...statePost, likes: post.likes } : statePost
      )
    })
  ),
  on(REMOVE_LIKE_POST_ERROR_ACTION, (state: PostsState): PostsState => ({ ...state })),
  on(RESET_POSTS_STATE_ACTION, (): PostsState => initialState),
  on(COMMENT_POSTS_ACTION, (state: PostsState): PostsState => ({ ...state })),
  on(COMMENT_POSTS_SUCCESS_ACTION, (state: PostsState, { post }): PostsState => {
    const newPost = state.posts.find((p: IPost) => p.id === post.id) || post;
    const comments = post?.comments ? post.comments : [];
    newPost!.comments = comments;

    const newState = {
      ...state,
      isLoading: false,
      posts: [...state.posts, newPost]
    };

    return newState;
  }),
  on(COMMENT_POSTS_ERROR_ACTION, (state: PostsState): PostsState => ({ ...state }))
);
