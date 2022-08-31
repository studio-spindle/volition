import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login-view/login-view.component';
import {AuthFormModule} from '../../components/auth-form/auth-form.module';
import {AuthGuard} from '../../guards/auth.guard';
import {AuthService} from '../../services/auth.service';

const ROUTES: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    AuthFormModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
  ],
})
export class LoginModule {}
