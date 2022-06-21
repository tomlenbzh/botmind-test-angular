import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { UserFeedComponent } from '@app/users/components/user-feed/user-feed.component';
import { UserFeedContainerComponent } from './user-feed-container.component';
import * as fromRoot from '@store/index';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('UserFeedContainerComponent', () => {
  let component: UserFeedContainerComponent;
  let fixture: ComponentFixture<UserFeedContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [UserFeedContainerComponent, UserFeedComponent],
      imports: [StoreModule.forRoot(fromRoot.reducers), RouterTestingModule, InfiniteScrollModule],
      providers: [Actions]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFeedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
