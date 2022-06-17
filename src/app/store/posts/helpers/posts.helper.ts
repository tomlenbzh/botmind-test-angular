import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IListMeta, IPost } from 'src/app/posts/utils/interfaces';
import { AppState } from 'src/app/store';
import { IUser } from '../../../authentication/utils/interfaces';
import { CREATE_POST_ACTION, FETCH_POSTS_ACTION } from '../actions/posts.actions';
import { selectPosts, selectPostsLoading, selectMeta } from '../selectors/posts.selectors';

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
}
