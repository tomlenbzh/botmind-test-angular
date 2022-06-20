import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { containers } from './containers';
import { components } from './components';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [...containers, ...components],
  imports: [CommonModule, SharedModule, TranslateModule.forChild(), FormsModule, ReactiveFormsModule],
  exports: [...containers, ...components]
})
export class ProfileModule {}
