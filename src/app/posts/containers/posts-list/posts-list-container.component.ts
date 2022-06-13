import { Component } from '@angular/core';
import { PostsList } from '../../utils/constants';
import { IPost } from '../../utils/interfaces';

@Component({
  template: '<app-posts-list [posts]="postsList"></app-posts-list>'
})
export class PostsListContainerComponent {
  postsList: IPost[] = PostsList;

  constructor() {}
}
