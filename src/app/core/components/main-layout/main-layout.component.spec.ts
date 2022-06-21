import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileContainerComponent } from '@app/profile/containers/profile-container/profile-container.component';
import { SharedModule } from '@app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { MainLayoutComponent } from './main-layout.component';
import * as fromRoot from '@store/index';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileComponent } from '@app/profile/components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLayoutComponent, ProfileContainerComponent, ProfileComponent],
      imports: [
        StoreModule.forRoot(fromRoot.reducers),
        TranslateModule.forRoot(),
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        LazyLoadImageModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
