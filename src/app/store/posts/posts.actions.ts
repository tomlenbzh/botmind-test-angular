import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IComment, ICommentData, ILike, ILikeData, IListMeta, IPost } from '@posts/utils/interfaces';
import { PostsActionTypes } from './posts.actions.types';

/**
 * FETCH ACTIONS
 */
export const FETCH_POSTS_ACTION = createAction(
  PostsActionTypes.FETCH_POSTS,
  props<{ limit?: number; page?: number; userId?: number }>()
);
export const FETCH_POSTS_SUCCESS_ACTION = createAction(
  PostsActionTypes.FETCH_POSTS_SUCCESS,
  props<{ posts: IPost[]; meta: IListMeta }>()
);
export const FETCH_POSTS_ERROR_ERROR = createAction(
  PostsActionTypes.FETCH_POSTS_ERROR,
  props<{ error: HttpErrorResponse }>()
);

/**
 * CREATE ACTIONS
 */
export const CREATE_POST_ACTION = createAction(PostsActionTypes.CREATE_POSTS, props<{ post: IPost }>());
export const CREATE_POST_SUCCESS_ACTION = createAction(PostsActionTypes.CREATE_POSTS_SUCCESS, props<{ post: IPost }>());
export const CREATE_POST_ERROR_ACTION = createAction(
  PostsActionTypes.CREATE_POSTS_ERROR,
  props<{ error: HttpErrorResponse }>()
);

/**
 * UPDATE ACTIONS
 */
export const UPDATE_POST_ACTION = createAction(PostsActionTypes.UPDATE_POSTS, props<{ id: number; post: IPost }>());
export const UPDATE_POST_SUCCESS_ACTION = createAction(PostsActionTypes.UPDATE_POSTS_SUCCESS, props<{ post: IPost }>());
export const UPDATE_POST_ERROR_ACTION = createAction(
  PostsActionTypes.UPDATE_POSTS_ERROR,
  props<{ error: HttpErrorResponse }>()
);

/**
 * DELETE ACTIONS
 */
export const DELETE_POST_ACTION = createAction(PostsActionTypes.DELETE_POSTS, props<{ id: number }>());
export const DELETE_POST_SUCCESS_ACTION = createAction(PostsActionTypes.DELETE_POSTS_SUCCESS, props<{ id: number }>());
export const DELETE_POST_ERROR_ACTION = createAction(
  PostsActionTypes.DELETE_POSTS_ERROR,
  props<{ error: HttpErrorResponse }>()
);

/**
 * LIKE ACTIONS
 */
export const LIKE_POST_ACTION = createAction(PostsActionTypes.LIKE_POSTS, props<{ like: ILike }>());
export const LIKE_POST_SUCCESS_ACTION = createAction(PostsActionTypes.LIKE_POSTS_SUCCESS, props<{ post: IPost }>());
export const LIKE_POST_ERROR_ACTION = createAction(
  PostsActionTypes.LIKE_POSTS_ERROR,
  props<{ error: HttpErrorResponse }>()
);

/**
 * REMOVE LIKE ACTIONS
 */
export const REMOVE_LIKE_POST_ACTION = createAction(PostsActionTypes.REMOVE_LIKE_POSTS, props<{ data: ILikeData }>());
export const REMOVE_LIKE_POST_SUCCESS_ACTION = createAction(
  PostsActionTypes.REMOVE_LIKE_POSTS_SUCCESS,
  props<{ post: IPost }>()
);
export const REMOVE_LIKE_POST_ERROR_ACTION = createAction(
  PostsActionTypes.REMOVE_LIKE_POSTS_ERROR,
  props<{ error: HttpErrorResponse }>()
);

/**
 * ADD COMMENTS ACTIONS
 */
export const COMMENT_POSTS_ACTION = createAction(PostsActionTypes.COMMENT_POSTS, props<{ comment: IComment }>());
export const COMMENT_POSTS_SUCCESS_ACTION = createAction(
  PostsActionTypes.COMMENT_POSTS_SUCCESS,
  props<{ post: IPost }>()
);
export const COMMENT_POSTS_ERROR_ACTION = createAction(
  PostsActionTypes.COMMENT_POSTS_ERROR,
  props<{ error: HttpErrorResponse }>()
);

/**
 * REMOVE COMMENTS ACTIONS
 */
export const REMOVE_COMMENT_POSTS_ACTION = createAction(
  PostsActionTypes.REMOVE_COMMENT_POSTS,
  props<{ data: ICommentData }>()
);
export const REMOVE_COMMENT_POSTS_SUCCESS_ACTION = createAction(
  PostsActionTypes.REMOVE_COMMENT_POSTS_SUCCESS,
  props<{ post: IPost }>()
);
export const REMOVE_COMMENT_POSTS_ERROR_ACTION = createAction(
  PostsActionTypes.REMOVE_COMMENT_POSTS_ERROR,
  props<{ error: HttpErrorResponse }>()
);

/**
 * RESET STATE
 */
export const RESET_POSTS_STATE_ACTION = createAction(PostsActionTypes.RESET_POSTS_STATE);
