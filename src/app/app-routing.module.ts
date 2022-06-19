import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { MainLayoutContainerComponent } from './core/containers/main-layout-container/main-layout-container.component';
import { AuthenticationGuard } from './shared/guards/auth.guard';

const layoutChildren: Route[] = [
  { path: 'posts', loadChildren: () => import('./posts/posts.module').then((m) => m.PostsModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then((m) => m.UsersModule) },
  { path: '', redirectTo: 'posts', pathMatch: 'full' }
];

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'app',
    component: MainLayoutContainerComponent,
    children: layoutChildren,
    canActivate: [AuthenticationGuard]
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'app' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
