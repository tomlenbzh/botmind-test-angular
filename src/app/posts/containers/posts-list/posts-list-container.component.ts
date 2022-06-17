import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/authentication/utils/interfaces';
import { PostsHelper } from 'src/app/store/posts/helpers/posts.helper';
import { ProfileHelper } from 'src/app/store/profile/helpers/profile.helper';
import { IListMeta, IPost } from '../../utils/interfaces';

@Component({
  template: `<app-posts-list
    [posts]="postsList | async"
    [meta]="meta | async"
    [currentUser]="currentUser | async"
    (postSubmitted)="createNewPost($event)"
    (scrolled)="fetchMore($event)"
  ></app-posts-list>`
})
export class PostsListContainerComponent implements OnInit {
  postsList!: Observable<IPost[] | null>;
  meta!: Observable<IListMeta | null>;
  currentUser!: Observable<IUser | null>;

  private limit = 10;
  private page = 1;

  constructor(private postsHelper: PostsHelper, private profileHelper: ProfileHelper) {}

  ngOnInit(): void {
    this.postsHelper.fetchPosts(this.limit, this.page);
    this.postsList = this.postsHelper.posts();
    this.meta = this.postsHelper.meta();
    this.currentUser = this.profileHelper.profile();
  }

  createNewPost(post: IPost): void {
    this.postsHelper.newPost(post);
  }

  fetchMore(meta: IListMeta): void {
    if (meta.totalPages !== this.page) {
      this.page = meta.currentPage + 1;
      this.postsHelper.fetchPosts(this.limit, this.page);
    }
  }
}
