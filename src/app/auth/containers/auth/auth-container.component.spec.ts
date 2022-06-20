import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthContainerComponent } from './auth-container.component';

describe('AuthContainerComponent', () => {
  let component: AuthContainerComponent;
  let fixture: ComponentFixture<AuthContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthContainerComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
