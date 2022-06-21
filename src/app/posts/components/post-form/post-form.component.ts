import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { IUser } from '@auth/utils/interfaces';
import { PostFormControlsNames } from '../../utils/posts.constants';
import { IPost } from '../../utils/interfaces';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnChanges {
  @Input() currentUser!: IUser | null;
  @Input() currentPost!: IPost | null;
  @Input() editMode = false;

  @Output() postSubmitted: EventEmitter<IPost> = new EventEmitter<IPost>();
  @Output() postEdited: EventEmitter<IPost> = new EventEmitter<IPost>();
  @Output() editCancelled: EventEmitter<IPost> = new EventEmitter<IPost>();

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
    !this.editMode && this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('currentPost') && this.currentPost) {
      this.createForm();
      this.setFormWithCurrentPost();
    }
  }

  cancelEdit(): void {
    this.editCancelled.emit();
  }

  submitForm(formDirective: FormGroupDirective): void {
    if (this.form.valid) {
      if (this.editMode) {
        const post: IPost = { ...this.currentPost, ...this.form.getRawValue() };
        this.postEdited.emit(post);
      } else {
        const post: IPost = { ...this.form.getRawValue(), user: this.currentUser };
        this.postSubmitted.emit(post);
        this.form.reset();
        formDirective.resetForm();
      }
    }
  }

  /**
   * Creates a new formGroup instance.
   */
  private createForm(): void {
    this.form = this.formBuilder.group({
      [this.controlNames.TITLE]: new FormControl('', [Validators.required, Validators.maxLength(this.titleMaxLength)]),
      [this.controlNames.BODY]: new FormControl('', [Validators.required, Validators.maxLength(this.bodyMaxLength)])
    });
  }

  /**
   * Injects the current's post information in the form.
   */
  private setFormWithCurrentPost(): void {
    if (this.currentUser && this.currentPost && this.editMode && this.form) {
      this.form.patchValue({
        [this.controlNames.TITLE]: this.currentPost?.title,
        [this.controlNames.BODY]: this.currentPost?.body
      });
    }
  }
}
