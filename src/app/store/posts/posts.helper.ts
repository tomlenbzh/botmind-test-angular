import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILike, ILikeData, IListMeta, IPost } from 'src/app/posts/utils/interfaces';
import { AppState } from 'src/app/store';
import { IUser } from '../../auth/utils/interfaces';
import {
  CREATE_POST_ACTION,
  DELETE_POST_ACTION,
  FETCH_POSTS_ACTION,
  LIKE_POST_ACTION,
  REMOVE_LIKE_POST_ACTION,
  RESET_POSTS_STATE_ACTION,
  UPDATE_POST_ACTION
} from './posts.actions';
import { selectPosts, selectPostsLoading, selectMeta } from './posts.selectors';

@Injectable({
  providedIn: 'root'
})
export class PostsHelper {
  constructor(private store: Store<AppState>) {}

  isLoading(): Observable<boolean> {
    return this.store.pipe(select(selectPostsLoading));
  }

  posts(): Observable<IPost[] | null> {
    return this.store.select(selectPosts);
  }

  meta(): Observable<IListMeta | null> {
    return this.store.select(selectMeta);
  }

  fetchPosts(limit: number, page: number, userId?: number): void {
    this.store.dispatch(FETCH_POSTS_ACTION({ page, limit, userId }));
  }

  newPost(post: IPost): void {
    this.store.dispatch(CREATE_POST_ACTION({ post }));
  }

  editPost(post: IPost): void {
    const postId = post.id;
    postId && this.store.dispatch(UPDATE_POST_ACTION({ id: postId, post }));
  }

  likePost(like: ILike): void {
    this.store.dispatch(LIKE_POST_ACTION({ like }));
  }

  removeLikePost(data: ILikeData): void {
    this.store.dispatch(REMOVE_LIKE_POST_ACTION({ data }));
  }

  resetState(): void {
    this.store.dispatch(RESET_POSTS_STATE_ACTION());
  }

  deletePost(id: number): void {
    this.store.dispatch(DELETE_POST_ACTION({ id }));
  }
}
