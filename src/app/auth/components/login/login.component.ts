import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginFormControlsNames } from '../../utils/constants';
import { IUser } from '../../utils/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() isLoading!: boolean | null;
  @Input() errorMessage!: string | null;

  @Output() loginClicked: EventEmitter<IUser> = new EventEmitter<IUser>();

  controlNames = LoginFormControlsNames;
  form!: FormGroup;

  get emailCtrl() {
    return this.form.get(this.controlNames.EMAIL);
  }

  get passwordCtrl() {
    return this.form.get(this.controlNames.PASSWORD);
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * Emits the user's credentials to the parent component.
   */
  submitForm(): void {
    if (this.form.valid) {
      const credentials: IUser = this.form.getRawValue();
      this.loginClicked.emit(credentials);
    }
  }

  /**
   * Creates a new formGroup instance.
   */
  private createForm(): void {
    this.form = this.formBuilder.group({
      [this.controlNames.EMAIL]: new FormControl('', [Validators.required, Validators.email]),
      [this.controlNames.PASSWORD]: new FormControl('', [Validators.required])
    });
  }
}
