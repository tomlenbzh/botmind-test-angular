import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { PostsState } from './posts.reducers';

export const postsFeature = (state: AppState) => state.posts;

export const selectPostsLoading = createSelector(postsFeature, (state: PostsState) => state.isLoading);
export const selectPosts = createSelector(postsFeature, (state: PostsState) => state.posts);
export const selectMeta = createSelector(postsFeature, (state: PostsState) => state.meta);
