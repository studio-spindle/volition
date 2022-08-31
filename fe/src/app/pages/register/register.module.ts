import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register-view/register-view.component';
import {AuthFormModule} from '../../components/auth-form/auth-form.module';
import {AuthGuard} from '../../guards/auth.guard';
import {AuthService} from '../../services/auth.service';

const ROUTES: Routes = [
  { path: '', component: RegisterComponent }
];

@NgModule({
  declarations: [RegisterComponent],
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
export class RegisterModule {}
