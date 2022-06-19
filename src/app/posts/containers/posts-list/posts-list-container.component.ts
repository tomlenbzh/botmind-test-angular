import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/authentication/utils/interfaces';
import { PostsHelper } from 'src/app/store/posts/helpers/posts.helper';
import { ProfileHelper } from 'src/app/store/profile/helpers/profile.helper';
import { ILike, ILikeData, IListMeta, IPost } from '../../utils/interfaces';

@Component({
  selector: 'app-posts-list-container',
  template: `<app-posts-list
    [posts]="postsList | async"
    [meta]="meta | async"
    [currentUser]="currentUser | async"
    (postSubmitted)="createNewPost($event)"
    [canAdd]="canAdd"
    (scrolled)="fetchMore($event)"
    (like)="likePost($event)"
    (removeLike)="removeLikePost($event)"
    (delete)="deletePost($event)"
  ></app-posts-list>`
})
export class PostsListContainerComponent implements OnInit, OnDestroy {
  @Input() canAdd = true;

  postsList!: Observable<IPost[] | null>;
  meta!: Observable<IListMeta | null>;
  currentUser!: Observable<IUser | null>;

  private limit = 10;
  private page = 1;

  constructor(private postsHelper: PostsHelper, private profileHelper: ProfileHelper) {}

  ngOnInit(): void {
    this.postsHelper.resetState();
    this.postsHelper.fetchPosts(this.limit, this.page);
    this.postsList = this.postsHelper.posts();
    this.meta = this.postsHelper.meta();
    this.currentUser = this.profileHelper.profile();
  }

  ngOnDestroy(): void {
    this.postsHelper.resetState();
  }

  createNewPost(post: IPost): void {
    this.postsHelper.newPost(post);
  }

  likePost(like: ILike): void {
    this.postsHelper.likePost(like);
  }

  removeLikePost(data: ILikeData): void {
    this.postsHelper.removeLikePost(data);
  }

  deletePost(id: number): void {
    this.postsHelper.deletePost(id);
  }

  fetchMore(meta: IListMeta): void {
    if (meta.totalPages !== this.page) {
      this.page = meta.currentPage + 1;
      this.postsHelper.fetchPosts(this.limit, this.page);
    }
  }
}
