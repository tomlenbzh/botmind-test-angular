import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [],
  imports: [CoreModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
