import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '@auth/utils/interfaces';

import { IListMeta, IPost } from '@posts/utils/interfaces';
import { PostsHelper } from '@app/store/posts/posts.helper';
import { ProfileHelper } from '@app/store/profile/profile.helper';

@Component({
  selector: 'app-user-feed-container',
  template: '<app-user-feed></app-user-feed>'
})
export class UserFeedContainerComponent implements OnInit {
  postsList!: Observable<IPost[] | null>;
  meta!: Observable<IListMeta | null>;
  currentUser!: IUser | null;

  private limit = 10;
  private page = 1;

  constructor(private postsHelper: PostsHelper, private profileHelper: ProfileHelper) {}

  ngOnInit(): void {
    this.postsList = this.postsHelper.posts();
    this.meta = this.postsHelper.meta();

    this.profileHelper.profile().subscribe((user: IUser | null) => {
      if (user) {
        this.currentUser = user;
        this.postsHelper.fetchPosts(this.limit, this.page, user?.id);
      }
    });
  }

  fetchMore(meta: IListMeta): void {
    if (meta.totalPages !== this.page) {
      this.page = meta.currentPage + 1;
      this.postsHelper.fetchPosts(this.limit, this.page, this.currentUser?.id);
    }
  }
}
