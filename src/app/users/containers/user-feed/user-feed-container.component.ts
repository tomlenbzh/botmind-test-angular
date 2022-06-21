import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IUser } from '@auth/utils/interfaces';

import { IListMeta, IPost } from '@posts/utils/interfaces';
import { PostsHelper } from '@app/store/posts/posts.helper';
import { ProfileHelper } from '@app/store/profile/profile.helper';
import { ActivatedRoute } from '@angular/router';
import { UserHelper } from '@app/store/user/user.helper';
import { Actions, ofType } from '@ngrx/effects';
import { userActionTypes } from '@app/store/user/user.actions.types';

@Component({
  selector: 'app-user-feed-container',
  template: `<app-user-feed
    [currentUser]="currentUser | async"
    [profile]="profile | async"
    [meta]="meta | async"
    (profileUpdated)="updateProfile($event)"
    (scrolled)="fetchMore($event)"
  ></app-user-feed>`
})
export class UserFeedContainerComponent implements OnInit, OnDestroy {
  postsList!: Observable<IPost[] | null>;
  meta!: Observable<IListMeta | null>;
  profile!: Observable<IUser | null>;
  currentUser!: Observable<IUser | null>;

  userId!: number | null;

  private limit = 10;
  private page = 1;
  private destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private postsHelper: PostsHelper,
    private profileHelper: ProfileHelper,
    private userHelper: UserHelper,
    private route: ActivatedRoute,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.profile = this.profileHelper.profile();
    this.currentUser = this.userHelper.user();
    this.postsList = this.postsHelper.posts();
    this.meta = this.postsHelper.meta();

    this.route.paramMap.subscribe((paramMap) => {
      this.postsHelper.resetState();
      this.userId = parseInt(paramMap.get('id') || '');
      this.userHelper.fetchUser(this.userId);
      this.postsHelper.fetchPosts(this.limit, this.page, this.userId);
    });

    this.actions$
      .pipe(ofType(userActionTypes.UPDATE_USER_SUCCESS), takeUntil(this.destroyed$))
      .subscribe((action: any) => {
        const user: IUser = action.user;
        user?.id && this.profileHelper.fetchProfile(user.id);
        user?.id && this.postsHelper.fetchPosts(this.limit, this.page, user.id);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  fetchMore(meta: IListMeta): void {
    if (meta.totalPages !== this.page && this.userId) {
      this.page = meta.currentPage + 1;
      this.postsHelper.fetchPosts(this.limit, this.page, this.userId);
    }
  }

  updateProfile(profile: IUser): void {
    if (profile.id) {
      this.userHelper.updateUser(profile.id, profile);
    }
  }
}
