import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFeedContainerComponent } from './user-feed-container.component';

describe('UserFeedContainerComponent', () => {
  let component: UserFeedContainerComponent;
  let fixture: ComponentFixture<UserFeedContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFeedContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFeedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
