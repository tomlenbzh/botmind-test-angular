import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '@app/auth/utils/interfaces';
import { IComment, IPost } from '@app/posts/utils/interfaces';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent {
  @Input() post!: IPost;
  @Input() currentUser!: IUser | null;

  @Output() commentAdded: EventEmitter<IComment> = new EventEmitter<IComment>();

  addNewComment(comment: IComment): void {
    this.commentAdded.emit(comment);
  }
}
