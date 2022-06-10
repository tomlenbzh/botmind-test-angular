import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginFormControlsNames } from '../../utils/constants';
import { ILoginCredentials } from '../../utils/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() loginClicked: EventEmitter<ILoginCredentials> = new EventEmitter<ILoginCredentials>();

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

  submitForm(): void {
    if (this.form.valid) {
      const credentials: ILoginCredentials = this.form.getRawValue();
      this.loginClicked.emit(credentials);
    }
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      [this.controlNames.EMAIL]: new FormControl('', [Validators.required, Validators.email]),
      [this.controlNames.PASSWORD]: new FormControl('', [Validators.required])
    });
  }
}
