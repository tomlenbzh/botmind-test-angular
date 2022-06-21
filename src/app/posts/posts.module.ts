import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { components } from './components';
import { containers } from './containers';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [...components, ...containers],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    LazyLoadImageModule
  ],
  exports: [...components, ...containers]
})
export class PostsModule {}
