import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { containers } from './containers';
import { components } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [...containers, components],
  imports: [CommonModule, AuthenticationRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule]
})
export class AuthenticationModule {}