import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostContainerComponent } from './containers/post/post-container.component';
import { PostsListContainerComponent } from './containers/posts-list/posts-list-container.component';

const routes: Routes = [
  { path: '', component: PostsListContainerComponent },
  { path: ':id', component: PostContainerComponent },
  { path: '**', redirectTo: 'posts' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
