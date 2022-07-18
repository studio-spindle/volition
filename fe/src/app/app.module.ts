import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {WildcardRoutingModule} from './wildcard-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth-interceptor';
import {CommonModule} from '@angular/common';
import {UserService} from './services/user.service';
import {authStateReducer} from './store/auth/auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/auth/auth.effects';
import {TasksEffects} from './store/tasks/tasks.effect';
import {UserEffects} from './store/user/user.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {HeaderModule} from './components/header/header.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    StoreModule.forRoot({
      auth: authStateReducer
    }),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true,
    }) : [],
    EffectsModule.forRoot([AuthEffects, UserEffects, TasksEffects]),
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    WildcardRoutingModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
