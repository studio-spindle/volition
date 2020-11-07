import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AuthModule} from '../auth/auth.module';

import {AppRoutingModule} from './app-routing.module';
import {UserDashboardModule} from './user-dashboard/user-dashboard.module';

import {AppComponent} from './app.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {WildcardRoutingModule} from './wildcard-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    UserDashboardModule,
    AuthModule,
    AppRoutingModule,
    WildcardRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [NotFoundComponent],
})
export class AppModule {}
