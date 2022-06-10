import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { containers } from './containers';
import { components } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginContainerComponent } from './containers/login/login-container.component';
import { SignupContainerComponent } from './containers/signup/signup-container.component';

@NgModule({
  declarations: [...containers, components, LoginContainerComponent, SignupContainerComponent],
  imports: [CommonModule, AuthenticationRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule]
})
export class AuthenticationModule {}
