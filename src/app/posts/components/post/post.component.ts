import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IUser } from 'src/app/authentication/utils/interfaces';
import { ILike, ILikeData, IPost } from '../../utils/interfaces';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

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
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() edit: EventEmitter<IPost> = new EventEmitter<IPost>();

  @ViewChild('deletePostDialog') deletePostDialog!: any;

  dialogRef!: MatDialogRef<any>;
  isAuthor = false;
  isEditing = false;
  likes = 0;
  likedByCurrentUser = false;
  currentUserLike!: ILike;
  placeholder = 'https://www.in.gov/bmv/images/profile-placeholder.png';
  updatedAt!: string;
  profileImage: string | null = null;

  constructor(private router: Router, private dialog: MatDialog, private translate: TranslateService) {}

  ngOnChanges(): void {
    if (this.post) {
      if (this.currentUser) {
        if (this.post.user?.id && this.currentUser.id) {
          this.checkIsAuthor(this.post.user?.id, this.currentUser.id);
          if (this.isAuthor) {
            this.profileImage = this.currentUser.image ? `${this.currentUser.image}?${Date.now()}` : this.placeholder;
          } else {
            this.profileImage = this.post.user.image || this.placeholder;
          }
        }

        if (this.post.likes) {
          this.setLikesNumber();
          this.checkIfLikedByCurrentUser(this.post.likes, this.currentUser);
        }
      }

      this.updatedAt = moment(this.post.updatedAt).locale(this.translate.currentLang).fromNow();
    }
  }

  manageLikes(): void {
    !this.likedByCurrentUser ? this.likePost() : this.removeLikePost();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  gotToUser(): void {
    if (this.currentUser) {
      this.router.navigateByUrl(`/app/users/${this.currentUser.id}`);
    }
  }

  deletePost(): void {
    if (this.post?.id) {
      this.delete.emit(this.post.id);
      this.closeDeleteModal();
    }
  }

  editPost(post: IPost): void {
    this.toggleEdit();
    this.edit.emit(post);
  }

  openDeleteModal(): void {
    this.dialogRef = this.dialog.open(this.deletePostDialog);
  }

  closeDeleteModal(): void {
    if (this.dialog) {
      this.dialogRef.close();
    }
  }

  private likePost(): void {
    if (this.currentUser?.id && this.post) {
      const like: ILike = {
        user: { id: this.currentUser.id as number },
        post: { id: this.post.id }
      };
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
