import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthContainerComponent } from './containers/auth/auth-container.component';
import { LoginContainerComponent } from './containers/login/login-container.component';
import { SignupContainerComponent } from './containers/signup/signup-container.component';

const routes: Routes = [
  {
    path: '',
    component: AuthContainerComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginContainerComponent, data: { title: 'AUTH.AUTH_TITLE.LOGIN' } },
      { path: 'signup', component: SignupContainerComponent, data: { title: 'AUTH.AUTH_TITLE.FORGOTTEN' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
