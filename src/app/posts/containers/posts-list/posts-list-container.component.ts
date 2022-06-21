import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser } from '@auth/utils/interfaces';
import { PostsHelper } from '@app/store/posts/posts.helper';
import { ProfileHelper } from '@app/store/profile/profile.helper';
import { IComment, ILike, ILikeData, IListMeta, IPost } from '../../utils/interfaces';

@Component({
  selector: 'app-posts-list-container',
  template: `<app-posts-list
    [posts]="postsList | async"
    [meta]="meta | async"
    [currentUser]="currentUser"
    (postSubmitted)="createNewPost($event)"
    [canAdd]="canAdd"
    [canFetch]="canFetch"
    (scrolled)="fetchMore($event)"
    (like)="likePost($event)"
    (removeLike)="removeLikePost($event)"
    (delete)="deletePost($event)"
    (edit)="editPost($event)"
    (commentAdded)="addNewComment($event)"
  ></app-posts-list>`
})
export class PostsListContainerComponent implements OnInit, OnDestroy {
  @Input() canAdd = true;
  @Input() canFetch = true;

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

      if (this.canFetch) {
        this.page = 1;
        this.postsHelper.fetchPosts(this.limit, this.page);
      }
    });
  }

  ngOnDestroy(): void {
    this.postsHelper.resetState();
  }

  addNewComment(comment: IComment): void {
    this.postsHelper.commentPost(comment);
  }

  /**
   * Creates a new post.
   *
   * @param     { IPost }     post
   */
  createNewPost(post: IPost): void {
    this.postsHelper.newPost(post);
  }

  /**
   * Adds one like to a specific post.
   *
   * @param     { IPost }     post
   */
  likePost(like: ILike): void {
    this.postsHelper.likePost(like);
  }

  /**
   * Removes one like from a specific post.
   *
   * @param     { IPost }     post
   */
  removeLikePost(data: ILikeData): void {
    this.postsHelper.removeLikePost(data);
  }

  /**
   * Deletes an existing post.
   *
   * @param     { IPost }     post
   */
  deletePost(id: number): void {
    this.postsHelper.deletePost(id);
  }

  /**
   * Edits an existing post.
   *
   * @param     { IPost }     post
   */
  editPost(post: IPost): void {
    this.postsHelper.editPost(post);
  }

  /**
   * Increments the page number anf fetches {{ limit }} more items to inject in the list.
   *
   * @param     { IPost }     post
   */
  fetchMore(meta: IListMeta): void {
    if (meta.totalPages !== this.page && this.canFetch) {
      this.page = meta.currentPage + 1;
      this.postsHelper.fetchPosts(this.limit, this.page);
    }
  }
}
