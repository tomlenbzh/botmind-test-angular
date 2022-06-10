import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutContainerComponent } from './main-layout-container.component';

describe('MainLayoutContainerComponent', () => {
  let component: MainLayoutContainerComponent;
  let fixture: ComponentFixture<MainLayoutContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLayoutContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
