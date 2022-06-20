import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '@app/auth/utils/interfaces';
import { ProfileFormName } from '@app/profile/utils/profile.constants';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnChanges {
  @Input() user!: IUser | null;
  @Input() profile!: IUser | null;

  @Output() profileUpdated: EventEmitter<IUser> = new EventEmitter<IUser>();

  @ViewChild('editProfileDialog') editProfileDialog!: any;

  placeholder = 'https://www.in.gov/bmv/images/profile-placeholder.png';
  userImage: string | null = null;
  dialogRef!: MatDialogRef<any>;
  form!: FormGroup;
  inputNames = ProfileFormName;
  descMaxLength = 200;

  get isUserProfile(): boolean {
    if (this.profile?.id && this.user?.id) {
      return this.profile.id === this.user.id;
    } else {
      return false;
    }
  }

  get imageCtrl() {
    return this.form.get(this.inputNames.IMAGE);
  }

  get descriptionCtrl() {
    return this.form.get(this.inputNames.DESCRIPTION);
  }

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('user') && this.user) {
      this.userImage = this.user.image ? `${this.user.image}?${Date.now()}` : this.placeholder;
    }
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
        [this.inputNames.DESCRIPTION]: this.user?.description,
        [this.inputNames.IMAGE]: this.user?.image || ''
      });
    }
  }

  submitProfile(): void {
    if (this.form.valid) {
      const newUser: IUser = { ...this.user, ...this.form.getRawValue() };
      this.profileUpdated.emit(newUser);
      this.closeModal();
    }
  }

  closeModal() {
    if (this.dialogRef) this.dialogRef.close();
  }
}
