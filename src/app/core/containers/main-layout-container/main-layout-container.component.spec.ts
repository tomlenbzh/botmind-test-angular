import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MainLayoutContainerComponent } from './main-layout-container.component';
import * as fromRoot from '@store/index';
import { MainLayoutComponent } from '@app/core/components/main-layout/main-layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileContainerComponent } from '@app/profile/containers/profile-container/profile-container.component';
import { ProfileComponent } from '@app/profile/components/profile/profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileHelper } from '@app/store/profile/profile.helper';

describe('MainLayoutContainerComponent', () => {
  let component: MainLayoutContainerComponent;
  let fixture: ComponentFixture<MainLayoutContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLayoutContainerComponent, MainLayoutComponent, ProfileContainerComponent, ProfileComponent],
      imports: [
        StoreModule.forRoot(fromRoot.reducers),
        TranslateModule.forRoot(),
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [ProfileHelper]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
