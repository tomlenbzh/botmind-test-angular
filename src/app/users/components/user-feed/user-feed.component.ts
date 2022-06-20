import { Component, Input } from '@angular/core';
import { IUser } from '@auth/utils/interfaces';
import { IListMeta, IPost } from '@posts/utils/interfaces';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.scss']
})
export class UserFeedComponent {
  @Input() postsList!: IPost[] | null;
  @Input() meta!: IListMeta | null;
  @Input() currentUser!: IUser | null;
}
