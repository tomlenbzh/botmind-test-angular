import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationContainerComponent } from './containers/authentication/authentication-container.component';
import { LoginContainerComponent } from './containers/login/login-container.component';
import { SignupContainerComponent } from './containers/signup/signup-container.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationContainerComponent,
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
export class AuthenticationRoutingModule {}
