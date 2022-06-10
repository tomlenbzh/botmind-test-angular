import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { directives } from './directives';

@NgModule({
  declarations: [...directives],
  imports: [CommonModule]
})
export class SharedModule {}
