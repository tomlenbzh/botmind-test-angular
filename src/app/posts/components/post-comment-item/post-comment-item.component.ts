import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IComment } from '@app/posts/utils/interfaces';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-post-comment-item',
  templateUrl: './post-comment-item.component.html',
  styleUrls: ['./post-comment-item.component.scss']
})
export class PostCommentItemComponent implements OnChanges {
  @Input() comment!: IComment;

  updatedAt: string = '';
  profileImage = '';
  placeholder = 'https://www.in.gov/bmv/images/profile-placeholder.png';

  constructor(private router: Router, private translate: TranslateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('comment') && this.comment) {
      const updatedAt = this.comment.updatedAt;
      updatedAt && this.setUpdatedDate(updatedAt);
      this.profileImage = this.comment.user.image || this.placeholder;
    }
  }

  deleteComment(): void {}

  navigateToUserFeed(): void {
    const userId = this.comment.user.id;
    userId && this.router.navigateByUrl(`/app/users/${userId}`);
  }

  private setUpdatedDate(updatedAt: Date): void {
    this.updatedAt = moment(updatedAt).locale(this.translate.currentLang).fromNow();
  }
}
