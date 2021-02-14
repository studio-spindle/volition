import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {AuthState} from './store/auth/Auth.state';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {WildcardRoutingModule} from './wildcard-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth-interceptor';
import {TasksState} from './store/tasks/Tasks.state';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    WildcardRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState, TasksState]),
    NgxsStoragePluginModule.forRoot({
      key: 'auth',
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
