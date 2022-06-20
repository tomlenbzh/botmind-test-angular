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
  @Output() profileUpdated: EventEmitter<IUser> = new EventEmitter<IUser>();

  @ViewChild('deleteAccountDialog') deleteAccountDialog!: any;
  @ViewChild('editProfileDialog') editProfileDialog!: any;

  dialogRef!: MatDialogRef<any>;
  form!: FormGroup;
  inputNames = ProfileFormName;
  descMaxLength = 200;
  placeholder = 'https://www.in.gov/bmv/images/profile-placeholder.png';
  profileImage: string | null = null;

  get isUserFeed(): boolean {
    return this.profile?.id && this.router.url === `/app/users/${this.profile.id}` ? true : false;
  }

  get imageCtrl() {
    return this.form.get(this.inputNames.IMAGE);
  }

  get descriptionCtrl() {
    return this.form.get(this.inputNames.DESCRIPTION);
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

  editProfile(): void {
    this.dialogRef = this.dialog.open(this.editProfileDialog);
    this.form = this.formBuilder.group({
      [this.inputNames.DESCRIPTION]: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.descMaxLength)
      ]),
      [this.inputNames.IMAGE]: new FormControl('', [Validators.required])
    });
    if (this.profile) {
      this.form.patchValue({
        [this.inputNames.DESCRIPTION]: this.profile?.description,
        [this.inputNames.IMAGE]: this.profile?.image || ''
      });
    }
  }

  submitProfile(): void {
    if (this.form.valid) {
      const newUser: IUser = { ...this.profile, ...this.form.getRawValue() };
      this.profileUpdated.emit(newUser);
      this.closeModal();
    }
  }
}
