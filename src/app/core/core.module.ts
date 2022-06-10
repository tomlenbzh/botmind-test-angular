import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BrowserModule, TransferState } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../app.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { components } from './components';
import { containers } from './containers';

@NgModule({
  declarations: [AppComponent, ...components, ...containers],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    BrowserModule.withServerTransition({ appId: 'app' }),
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule
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
