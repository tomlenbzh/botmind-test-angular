import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '@auth/utils/interfaces';
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
  @Output() edit: EventEmitter<IPost> = new EventEmitter<IPost>();

  onScroll(): void {
    if (this.meta) this.scrolled.emit(this.meta);
  }

  /**
   * Notifies the parent component that the post shoule be published.
   *
   * @param     { IPost }      post
   */
  submitPost(post: IPost): void {
    this.postSubmitted.emit(post);
  }

  /**
   * Notifies the parent component that a like should be added.
   *
   * @param     { IPost }      post
   */
  likePost(like: ILike): void {
    this.like.emit(like);
  }

  /**
   * Notifies the parent component that a like should be removed.
   *
   * @param     { IPost }      post
   */
  removeLikePost(data: ILikeData): void {
    this.removeLike.emit(data);
  }

  /**
   * Notifies the parent component that the post shoule be deleted.
   *
   * @param     { number }      id
   */
  deletePost(id: number): void {
    this.delete.emit(id);
  }

  /**
   * Notifies the parent component that the post shoule be edited.
   *
   * @param     { IPost }      post
   */
  editPost(post: IPost): void {
    this.edit.emit(post);
  }
}
