import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFeedContainerComponent } from './containers/user-feed/user-feed-container.component';

const routes: Routes = [{ path: ':id', component: UserFeedContainerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
