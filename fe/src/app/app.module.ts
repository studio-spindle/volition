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
import {UserProfileService} from './services/user-profile.service';
import {authStateReducer} from './store/auth/auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/auth/auth.effects';
import {TasksEffects} from './store/tasks/tasks.effect';
import {UserProfileEffects} from './store/user-profile/user-profile.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {authMetaReducer} from './store/auth/auth.metareducer';
import {userProfileReducer} from './store/user-profile/user-profile.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    StoreModule.forRoot([]),
    StoreModule.forFeature('auth', authStateReducer, {
      metaReducers: [authMetaReducer]
    }),
    StoreModule.forFeature('userProfile', userProfileReducer),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true,
    }) : [],
    EffectsModule.forRoot([AuthEffects, UserProfileEffects, TasksEffects]),
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
    UserProfileService,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
