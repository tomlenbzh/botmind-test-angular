import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { components } from './components';
import { containers } from './containers';
import { SharedModule } from '../shared/shared.module';
import { PostsModule } from '../posts/posts.module';

@NgModule({
  declarations: [...components, ...containers],
  imports: [CommonModule, UsersRoutingModule, SharedModule, PostsModule]
})
export class UsersModule {}
