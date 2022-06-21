import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { PostComponent } from './post.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { PostCommentsComponent } from '../post-comments/post-comments.component';
import { PostCommentsFormComponent } from '../post-comments-form/post-comments-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent, PostCommentsComponent, PostCommentsFormComponent],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        SharedModule,
        LazyLoadImageModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
