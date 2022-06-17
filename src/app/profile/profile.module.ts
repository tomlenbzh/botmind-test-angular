import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { containers } from './containers';
import { components } from './components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [...containers, ...components],
  imports: [CommonModule, SharedModule],
  exports: [...containers, ...components]
})
export class ProfileModule {}
