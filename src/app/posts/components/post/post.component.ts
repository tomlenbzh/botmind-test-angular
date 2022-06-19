import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IUser } from 'src/app/authentication/utils/interfaces';
import { ILike, ILikeData, IPost } from '../../utils/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnChanges {
  @Input() post!: IPost;
  @Input() currentUser!: IUser | null;

  @Output() like: EventEmitter<ILike> = new EventEmitter<ILike>();
  @Output() removelike: EventEmitter<ILikeData> = new EventEmitter<ILikeData>();

  isAuthor = false;
  likes = 0;
  likedByCurrentUser = false;
  currentUserLike!: ILike;

  constructor() {}

  ngOnChanges(): void {
    if (this.post && this.currentUser) {
      if (this.post.user?.id && this.currentUser.id) {
        this.checkIsAuthor(this.post.user?.id, this.currentUser.id);
      }

      if (this.post.likes) {
        this.setLikesNumber();
        this.checkIfLikedByCurrentUser(this.post.likes, this.currentUser);
      }
    }
  }

  manageLikes(): void {
    !this.likedByCurrentUser ? this.likePost() : this.removeLikePost();
  }

  private likePost(): void {
    if (this.currentUser?.id && this.post) {
      const like: ILike = {
        user: { id: this.currentUser.id as number },
        post: { id: this.post.id }
      };
      // const data: ILikeData = { like, currentUser: this.currentUser };

      this.like.emit(like);
    }
  }

  private removeLikePost(): void {
    if (this.currentUserLike.id) {
      const data: ILikeData = {
        likeId: this.currentUserLike.id,
        post: { id: this.post.id }
      };
      this.removelike.emit(data);
    }
  }

  private checkIsAuthor(postUserId: number, currentUserId: number): void {
    this.isAuthor = postUserId === currentUserId;
  }

  private setLikesNumber(): void {
    this.likes = this.post.likes?.length || 0;
  }

  private checkIfLikedByCurrentUser(likes: ILike[], currentUser: IUser): void {
    this.likedByCurrentUser = likes.some((like: ILike) => like.user.id === currentUser.id);
    if (this.likedByCurrentUser) {
      const currentUserLike = likes.find((like: ILike) => like.user.id === currentUser.id);
      if (currentUserLike) this.currentUserLike = currentUserLike;
    }
  }
}
