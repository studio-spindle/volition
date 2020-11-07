import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {LoginService} from './login.service';
import {LoginComponent} from './containers/login-view/login-view.component';
import {LoginFormComponent} from './components/login-form/login-form.component';

// export const ROUTES: Routes = [
//   { path: '', component: LoginComponent }
// ];

@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [LoginService],
})
export class LoginModule {}
