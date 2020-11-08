import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {LoginService} from './login.service';
import {LoginComponent} from './containers/login-view/login-view.component';
import {SharedModule} from '../shared/shared.module';

export const ROUTES: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
  ],
  providers: [LoginService],
})
export class LoginModule {}
