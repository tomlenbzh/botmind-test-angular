import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/authentication/utils/interfaces';
import { ProfileHelper } from 'src/app/store/profile/helpers/profile.helper';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss']
})
export class ProfileContainerComponent implements OnInit {
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
