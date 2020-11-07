import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {UserDashboardModule} from './user-dashboard/user-dashboard.module';

import { AppComponent } from './app.component';
import {AppComponent} from './app.component';
import {NotFoundComponent} from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    // angular modules
    BrowserModule,
    AppRoutingModule,
    // custom modules
    UserDashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [NotFoundComponent],
})
export class AppModule {}
