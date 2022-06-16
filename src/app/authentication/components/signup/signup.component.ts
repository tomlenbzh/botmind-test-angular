import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupFormControlsNames } from '../../utils/constants';
import { IUser } from '../../utils/interfaces';
import { passwordMatchValidator } from '../../utils/validators/check-passwords';
import { CustomErrorStateMatcher } from '../../utils/validators/state-matcher';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @Input() isLoading!: boolean | null;
  @Input() errorMessage!: string | null;

  @Output() signUpClicked: EventEmitter<IUser> = new EventEmitter<IUser>();

  controlNames = SignupFormControlsNames;
  form!: FormGroup;
  stateMatcher = new CustomErrorStateMatcher();

  get emailCtrl() {
    return this.form.get(this.controlNames.EMAIL);
  }

  get passwordCtrl() {
    return this.form.get(this.controlNames.PASSWORD);
  }

  get passwordConfirmCtrl() {
    return this.form.get(this.controlNames.PASSWORD_CONFIRMATION);
  }

  get userNameCtrl() {
    return this.form.get(this.controlNames.USERNAME);
  }

  get nameCtrl() {
    return this.form.get(this.controlNames.NAME);
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  submitForm(): void {
    if (this.form.valid) {
      const credentials: IUser = this.form.getRawValue();
      this.signUpClicked.emit(credentials);
    }
  }

  onPasswordInput(): void {
    this.passwordConfirmCtrl?.setErrors(this.form.hasError('passwordMismatch') ? [{ passwordMismatch: true }] : null);
  }

  private createForm(): void {
    this.form = this.formBuilder.group(
      {
        [this.controlNames.EMAIL]: new FormControl('', [Validators.required, Validators.email]),
        [this.controlNames.USERNAME]: new FormControl('', [Validators.required]),
        [this.controlNames.NAME]: new FormControl('', [Validators.required]),
        [this.controlNames.PASSWORD]: new FormControl('', [Validators.required]),
        [this.controlNames.PASSWORD_CONFIRMATION]: new FormControl('', [Validators.required])
      },
      { validator: passwordMatchValidator }
    );
  }
}
