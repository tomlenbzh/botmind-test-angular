import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { IUser } from '@app/auth/utils/interfaces';
import { IComment, IPost } from '@app/posts/utils/interfaces';
import { PostCommentsFormControlsNames } from '@app/posts/utils/posts.constants';
import { take } from 'rxjs';

@Component({
  selector: 'app-post-comments-form',
  templateUrl: './post-comments-form.component.html',
  styleUrls: ['./post-comments-form.component.scss']
})
export class PostCommentsFormComponent implements OnInit {
  @Input() currentUser!: IUser | null;
  @Input() currentPost!: IPost | null;
  @Input() editMode = false;

  @Output() commentAdded: EventEmitter<IComment> = new EventEmitter<IComment>();

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  controlNames = PostCommentsFormControlsNames;
  form!: FormGroup;
  titleMaxLength = 100;
  bodyMaxLength = 500;

  get commentCtrl() {
    return this.form.get(this.controlNames.COMMENT);
  }

  constructor(private formBuilder: FormBuilder, private ngZone: NgZone) {}

  ngOnInit(): void {
    !this.editMode && this.createForm();
  }

  submitForm(formDirective: FormGroupDirective): void {
    if (this.form.valid && this.currentPost?.id && this.currentUser?.id) {
      if (this.form.getRawValue()[this.controlNames.COMMENT] === '') return;

      const data: IComment = {
        content: this.form.getRawValue()[this.controlNames.COMMENT],
        user: { id: this.currentUser.id },
        post: { id: this.currentPost.id }
      };

      this.commentAdded.emit(data);
      this.form.reset();
      formDirective.resetForm();
    }
  }

  triggerResize() {
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  /**
   * Creates a new formGroup instance.
   */
  private createForm(): void {
    this.form = this.formBuilder.group({
      [this.controlNames.COMMENT]: new FormControl('')
    });
  }
}
