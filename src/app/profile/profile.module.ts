import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { containers } from './containers';
import { components } from './components';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [...containers, ...components],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule
  ],
  exports: [...containers, ...components]
})
export class ProfileModule {}
