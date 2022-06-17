import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { IPost } from 'src/app/posts/utils/interfaces';
import { PostsService } from 'src/app/services/posts/posts.service';
import {
  FETCH_POSTS_ACTION,
  FETCH_POSTS_SUCCESS_ACTION,
  FETCH_POSTS_ERROR_ERROR,
  CREATE_POST_ACTION,
  CREATE_POST_SUCCESS_ACTION,
  CREATE_POST_ERROR_ACTION
} from '../actions/posts.actions';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}

  fetchPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FETCH_POSTS_ACTION),
      exhaustMap((action) => {
        return this.postsService.fetchPostsList(action.limit, action.page, action.userId).pipe(
          map(({ items, meta }) => {
            return FETCH_POSTS_SUCCESS_ACTION({ posts: items, meta });
          }),
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
          map((post: IPost) => {
            return CREATE_POST_SUCCESS_ACTION({ post });
          }),
          catchError((error) => of(CREATE_POST_ERROR_ACTION({ error })))
        );
      })
    );
  });
}
