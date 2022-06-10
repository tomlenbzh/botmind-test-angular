import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { MainLayoutContainerComponent } from './core/containers/main-layout-container/main-layout-container.component';

const mainChildren: Route[] = [
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then((m) => m.PostsModule),
    data: { title: 'POSTS' }
  }
];

const routes: Routes = [
  // { path: '', loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule) }
  { path: '', component: MainLayoutContainerComponent, children: mainChildren },
  // canActivate: [AuthGuard]
  { path: '**', redirectTo: 'posts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
