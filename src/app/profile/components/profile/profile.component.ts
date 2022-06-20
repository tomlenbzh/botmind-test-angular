import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IUser } from '@auth/utils/interfaces';
import { ProfileFormName } from '../../utils/profile.constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnChanges {
  @Input() profile!: IUser | null;
  @Input() header = false;

  @Output() accountDeleted: EventEmitter<IUser> = new EventEmitter<IUser>();

  @ViewChild('deleteAccountDialog') deleteAccountDialog!: any;

  dialogRef!: MatDialogRef<any>;
  placeholder = 'https://www.in.gov/bmv/images/profile-placeholder.png';
  profileImage: string | null = null;

  get isUserFeed(): boolean {
    return this.profile?.id && this.router.url === `/app/users/${this.profile.id}` ? true : false;
  }

  constructor(private router: Router, private dialog: MatDialog, private formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('profile') && this.profile) {
      this.profileImage = this.profile.image ? `${this.profile.image}?${Date.now()}` : this.placeholder;
    }
  }

  gotToMyFeed(): void {
    this.profile?.id && this.router.navigateByUrl(`/app/users/${this.profile?.id}`);
  }

  gotToAllPosts(): void {
    this.router.navigateByUrl('/app');
  }

  deleteAccount(): void {
    if (this.profile?.id) {
      this.accountDeleted.emit(this.profile);
      this.closeModal();
    }
  }

  openDeleteModal() {
    this.dialogRef = this.dialog.open(this.deleteAccountDialog);
  }

  closeModal() {
    if (this.dialogRef) this.dialogRef.close();
  }
}
