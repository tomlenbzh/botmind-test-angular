import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { components } from './components';
import { containers } from './containers';
import { SharedModule } from '../shared/shared.module';
import { PostsModule } from '../posts/posts.module';
import { ProfileModule } from '../profile/profile.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [...components, ...containers],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    PostsModule,
    ProfileModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    InfiniteScrollModule
  ]
})
export class UsersModule {}
