import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '@auth/utils/interfaces';
import { IListMeta, IPost } from '@posts/utils/interfaces';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.scss']
})
export class UserFeedComponent {
  @Input() currentUser!: IUser | null;
  @Input() profile!: IUser | null;
  @Input() meta!: IListMeta | null;

  @Output() profileUpdated: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output() scrolled: EventEmitter<IListMeta> = new EventEmitter<IListMeta>();

  updateProfile(profile: IUser): void {
    this.profileUpdated.emit(profile);
  }

  onScroll(): void {
    this.meta && this.scrolled.emit(this.meta);
  }
}
