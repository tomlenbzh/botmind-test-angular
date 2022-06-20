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
    [currentUser]="currentUser"
    (postSubmitted)="createNewPost($event)"
    [canAdd]="canAdd"
    (scrolled)="fetchMore($event)"
    (like)="likePost($event)"
    (removeLike)="removeLikePost($event)"
    (delete)="deletePost($event)"
    (edit)="editPost($event)"
  ></app-posts-list>`
})
export class PostsListContainerComponent implements OnInit, OnDestroy {
  @Input() canAdd = true;

  postsList!: Observable<IPost[] | null>;
  meta!: Observable<IListMeta | null>;
  currentUser!: IUser | null;

  private limit = 10;
  private page = 1;

  constructor(private postsHelper: PostsHelper, private profileHelper: ProfileHelper) {}

  ngOnInit(): void {
    this.postsHelper.resetState();
    this.postsList = this.postsHelper.posts();
    this.meta = this.postsHelper.meta();
    this.profileHelper.profile().subscribe((user: IUser | null) => {
      this.postsHelper.resetState();
      this.currentUser = user;
      this.page = 1;
      this.postsHelper.fetchPosts(this.limit, this.page);
    });
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

  editPost(post: IPost): void {
    this.postsHelper.editPost(post);
  }

  fetchMore(meta: IListMeta): void {
    if (meta.totalPages !== this.page) {
      this.page = meta.currentPage + 1;
      this.postsHelper.fetchPosts(this.limit, this.page);
    }
  }
}
