import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from 'src/app/authentication/utils/interfaces';
import { ILike, ILikeData, IListMeta, IPost } from '../../utils/interfaces';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent {
  @Input() posts!: IPost[] | null;
  @Input() meta!: IListMeta | null;
  @Input() currentUser!: IUser | null;
  @Input() canAdd = true;

  @Output() postSubmitted: EventEmitter<IPost> = new EventEmitter<IPost>();
  @Output() scrolled: EventEmitter<IListMeta> = new EventEmitter<IListMeta>();
  @Output() like: EventEmitter<ILike> = new EventEmitter<ILike>();
  @Output() removeLike: EventEmitter<ILikeData> = new EventEmitter<ILikeData>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  onScroll(): void {
    if (this.meta) this.scrolled.emit(this.meta);
  }

  submitPost(post: IPost): void {
    this.postSubmitted.emit(post);
  }

  likePost(like: ILike): void {
    this.like.emit(like);
  }

  removeLikePost(data: ILikeData): void {
    this.removeLike.emit(data);
  }

  deletePost(id: number): void {
    this.delete.emit(id);
  }
}
