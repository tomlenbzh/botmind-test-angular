import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from '../app.component';
import { SharedModule } from '../shared/shared.module';
import { components } from './components';
import { containers } from './containers';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment.prod';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../store/authentication/effects/authentication.effects';
import { reducers, metaReducers } from '../store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [AppComponent, ...components, ...containers, UserInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule.withServerTransition({ appId: 'app' }),
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    InfiniteScrollModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal })
  ],
  providers: [],
  exports: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
