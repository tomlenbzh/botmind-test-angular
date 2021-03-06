import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { IPost } from '@posts/utils/interfaces';
import { LikesService } from 'src/app/services/likes/likes.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import {
  FETCH_POSTS_ACTION,
  FETCH_POSTS_SUCCESS_ACTION,
  FETCH_POSTS_ERROR_ERROR,
  CREATE_POST_ACTION,
  CREATE_POST_SUCCESS_ACTION,
  CREATE_POST_ERROR_ACTION,
  LIKE_POST_ACTION,
  LIKE_POST_SUCCESS_ACTION,
  LIKE_POST_ERROR_ACTION,
  REMOVE_LIKE_POST_ACTION,
  REMOVE_LIKE_POST_SUCCESS_ACTION,
  REMOVE_LIKE_POST_ERROR_ACTION,
  DELETE_POST_ACTION,
  DELETE_POST_SUCCESS_ACTION,
  DELETE_POST_ERROR_ACTION,
  UPDATE_POST_ACTION,
  UPDATE_POST_SUCCESS_ACTION,
  COMMENT_POSTS_ACTION,
  COMMENT_POSTS_SUCCESS_ACTION,
  COMMENT_POSTS_ERROR_ACTION,
  REMOVE_COMMENT_POSTS_ACTION,
  REMOVE_COMMENT_POSTS_SUCCESS_ACTION,
  REMOVE_COMMENT_POSTS_ERROR_ACTION
} from './posts.actions';
import { CommentsService } from '@app/services/comments/comments.service';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private likesService: LikesService,
    private commentsService: CommentsService
  ) {}

  fetchPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FETCH_POSTS_ACTION),
      exhaustMap((action) => {
        return this.postsService.fetchPostsList(action.limit, action.page, action.userId).pipe(
          map(({ items, meta }) => FETCH_POSTS_SUCCESS_ACTION({ posts: items, meta })),
          catchError((error) => of(FETCH_POSTS_ERROR_ERROR({ error })))
        );
      })
    );
  });

  createPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CREATE_POST_ACTION),
      exhaustMap((action) => {
        return this.postsService.createPost(action.post).pipe(
          map((post: IPost) => CREATE_POST_SUCCESS_ACTION({ post })),
          catchError((error) => of(CREATE_POST_ERROR_ACTION({ error })))
        );
      })
    );
  });

  editPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UPDATE_POST_ACTION),
      exhaustMap((action) => {
        return this.postsService.editPost(action.id, action.post).pipe(
          map((post: IPost) => UPDATE_POST_SUCCESS_ACTION({ post })),
          catchError((error) => of(CREATE_POST_ERROR_ACTION({ error })))
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DELETE_POST_ACTION),
      exhaustMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map(() => DELETE_POST_SUCCESS_ACTION({ id: action.id })),
          catchError((error) => of(DELETE_POST_ERROR_ACTION({ error })))
        );
      })
    );
  });

  likePost = createEffect(() => {
    return this.actions$.pipe(
      ofType(LIKE_POST_ACTION),
      exhaustMap((action) => {
        return this.likesService.createLike(action.like).pipe(
          map((post: IPost) => LIKE_POST_SUCCESS_ACTION({ post })),
          catchError((error) => of(LIKE_POST_ERROR_ACTION({ error })))
        );
      })
    );
  });

  removeLikePost = createEffect(() => {
    return this.actions$.pipe(
      ofType(REMOVE_LIKE_POST_ACTION),
      exhaustMap((action) => {
        return this.likesService.removeLike(action.data).pipe(
          map((post: IPost) => REMOVE_LIKE_POST_SUCCESS_ACTION({ post })),
          catchError((error) => of(REMOVE_LIKE_POST_ERROR_ACTION({ error })))
        );
      })
    );
  });

  commentPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(COMMENT_POSTS_ACTION),
      exhaustMap((action) => {
        return this.commentsService.createComment(action.comment).pipe(
          map((post: IPost) => COMMENT_POSTS_SUCCESS_ACTION({ post })),
          catchError((error) => of(COMMENT_POSTS_ERROR_ACTION({ error })))
        );
      })
    );
  });

  removeCommentePost = createEffect(() => {
    return this.actions$.pipe(
      ofType(REMOVE_COMMENT_POSTS_ACTION),
      exhaustMap((action) => {
        return this.commentsService.removeComment(action.data).pipe(
          map((post: IPost) => REMOVE_COMMENT_POSTS_SUCCESS_ACTION({ post })),
          catchError((error) => of(REMOVE_COMMENT_POSTS_ERROR_ACTION({ error })))
        );
      })
    );
  });
}
