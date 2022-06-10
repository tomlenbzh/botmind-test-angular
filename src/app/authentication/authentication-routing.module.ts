import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { AuthenticationContainerComponent } from './containers/authentication/authentication-container.component';
import { LoginContainerComponent } from './containers/login/login-container.component';
import { SignupContainerComponent } from './containers/signup/signup-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthenticationContainerComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginContainerComponent,
        data: { title: 'AUTH.AUTH_TITLE.LOGIN' }
        // canActivate: [UserIsAuthGuard]
      },
      {
        path: 'signup',
        component: SignupContainerComponent,
        data: { title: 'AUTH.AUTH_TITLE.FORGOTTEN' }
        // canActivate: [UserIsAuthGuard]
      }
      // { path: 'logout', component: LogoutContainerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
