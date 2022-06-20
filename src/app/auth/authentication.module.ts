import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '../material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { containers } from './containers';
import { components } from './components';

@NgModule({
  declarations: [...containers, components],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ]
})
export class AuthModule {}
