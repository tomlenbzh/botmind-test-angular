import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from 'src/app/authentication/utils/interfaces';
import { IListMeta, IPost } from '../../utils/interfaces';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent {
  @Input() posts!: IPost[] | null;
  @Input() meta!: IListMeta | null;
  @Input() currentUser!: IUser | null;

  @Output() postSubmitted: EventEmitter<IPost> = new EventEmitter<IPost>();
  @Output() scrolled: EventEmitter<IListMeta> = new EventEmitter<IListMeta>();

  onScroll(): void {
    if (this.meta) this.scrolled.emit(this.meta);
  }

  submitPost(post: IPost): void {
    this.postSubmitted.emit(post);
  }
}
