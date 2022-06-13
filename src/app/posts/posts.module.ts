import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { components } from './components';
import { containers } from './containers';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [...components, ...containers],
  imports: [CommonModule, PostsRoutingModule, SharedModule, InfiniteScrollModule]
})
export class PostsModule {}
