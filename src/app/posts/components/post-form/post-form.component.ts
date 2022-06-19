import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { IUser } from 'src/app/authentication/utils/interfaces';
import { PostFormControlsNames } from '../../constants/posts.constants';
import { IPost } from '../../utils/interfaces';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  @Input() currentUser!: IUser | null;
  @Output() postSubmitted: EventEmitter<IPost> = new EventEmitter<IPost>();

  controlNames = PostFormControlsNames;
  form!: FormGroup;
  titleMaxLength = 100;
  bodyMaxLength = 500;

  get titleCtrl() {
    return this.form.get(this.controlNames.TITLE);
  }

  get bodyCtrl() {
    return this.form.get(this.controlNames.BODY);
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  submitForm(formDirective: FormGroupDirective): void {
    if (this.form.valid) {
      const post: IPost = { ...this.form.getRawValue(), user: this.currentUser };
      this.postSubmitted.emit(post);
      this.form.reset();
      formDirective.resetForm();
    }
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      [this.controlNames.TITLE]: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      [this.controlNames.BODY]: new FormControl('', [Validators.required, Validators.maxLength(500)])
    });
  }
}
