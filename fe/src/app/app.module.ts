import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// import {AppRoutingModule} from './app-routing.module';
import {UserDashboardModule} from './user-dashboard/user-dashboard.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // angular modules
    BrowserModule,
    // AppRoutingModule,
    // custom modules
    UserDashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
