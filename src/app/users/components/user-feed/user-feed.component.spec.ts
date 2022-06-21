import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsListContainerComponent } from '@app/posts/containers/posts-list/posts-list-container.component';
import { ProfileContainerComponent } from '@app/profile/containers/profile-container/profile-container.component';
import { StoreModule } from '@ngrx/store';
import { UserFeedComponent } from './user-feed.component';
import * as fromRoot from '@store/index';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('UserFeedComponent', () => {
  let component: UserFeedComponent;
  let fixture: ComponentFixture<UserFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [UserFeedComponent, ProfileContainerComponent, PostsListContainerComponent],
      imports: [StoreModule.forRoot(fromRoot.reducers), InfiniteScrollModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
