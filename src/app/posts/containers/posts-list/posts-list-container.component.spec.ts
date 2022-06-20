import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsListContainerComponent } from './posts-list-container.component';
import * as fromRoot from '@store/index';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PostsListComponent } from '@app/posts/components/posts-list/posts-list.component';
import { PostFormComponent } from '@app/posts/components/post-form/post-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('PostsListContainerComponent', () => {
  let component: PostsListContainerComponent;
  let fixture: ComponentFixture<PostsListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsListContainerComponent, PostsListComponent, PostFormComponent],
      imports: [
        StoreModule.forRoot(fromRoot.reducers),
        RouterTestingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
        InfiniteScrollModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
