import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/containers/login-view/login-view.component';
import {RegisterComponent} from './register/containers/register-view/register-view.component';
import {LoginModule} from './login/login.module';
import {RegisterModule} from './register/register.module';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [LoginModule, RegisterModule],
})
export class AuthModule {}
