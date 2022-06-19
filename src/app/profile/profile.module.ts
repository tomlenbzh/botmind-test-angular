import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { containers } from './containers';
import { components } from './components';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [...containers, ...components],
  imports: [CommonModule, SharedModule, TranslateModule.forChild()],
  exports: [...containers, ...components]
})
export class ProfileModule {}
