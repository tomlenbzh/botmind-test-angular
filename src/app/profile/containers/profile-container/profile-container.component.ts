import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '@auth/utils/interfaces';
import { ProfileHelper } from '@app/store/profile/profile.helper';

@Component({
  selector: 'app-profile-container',
  template: `<app-profile
    [profile]="profile | async"
    [header]="header"
    (accountDeleted)="deleteAccount($event)"
  ></app-profile>`
})
export class ProfileContainerComponent implements OnInit {
  @Input() header = false;

  profile!: Observable<IUser | null>;

  constructor(private profileHelper: ProfileHelper) {}

  ngOnInit(): void {
    this.profile = this.profileHelper.profile();
  }

  deleteAccount(profile: IUser): void {
    if (profile.id) {
      this.profileHelper.deleteProfile(profile.id);
    }
  }
}
