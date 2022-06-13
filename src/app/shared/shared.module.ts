import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { directives } from './directives';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [...directives],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule]
})
export class SharedModule {}
