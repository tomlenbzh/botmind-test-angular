import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PostCommentItemComponent } from './post-comment-item.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

describe('PostCommentItemComponent', () => {
  let component: PostCommentItemComponent;
  let fixture: ComponentFixture<PostCommentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCommentItemComponent],
      imports: [RouterTestingModule, TranslateModule.forRoot(), LazyLoadImageModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
