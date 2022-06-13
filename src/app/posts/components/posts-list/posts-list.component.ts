import { Component, Input } from '@angular/core';
import { IPost } from '../../utils/interfaces';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent {
  @Input() posts: IPost[] | undefined;

  onScroll(): void {
    console.log('SCROLLING');
  }
}
