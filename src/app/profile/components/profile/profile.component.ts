import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IUser } from 'src/app/authentication/utils/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() profile!: IUser | null;
  @Output() accountDeleted: EventEmitter<IUser> = new EventEmitter<IUser>();
  @ViewChild('deleteAccountDialog') deleteAccountDialog!: any;

  dialogRef!: MatDialogRef<any>;

  get isUserFeed(): boolean {
    return this.profile?.id && this.router.url === `/app/users/${this.profile.id}` ? true : false;
  }

  constructor(private router: Router, private dialog: MatDialog) {}

  gotToMyFeed(): void {
    this.profile?.id && this.router.navigateByUrl(`/app/users/${this.profile?.id}`);
  }

  gotToAllPosts(): void {
    this.router.navigateByUrl('/app');
  }

  deleteAccount(): void {
    if (this.profile?.id) {
      this.accountDeleted.emit(this.profile);
      this.closeDeleteModal();
    }
  }

  openDeleteModal() {
    this.dialogRef = this.dialog.open(this.deleteAccountDialog);
  }

  closeDeleteModal() {
    if (this.dialogRef) this.dialogRef.close();
  }
}
