import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {RegisterService} from './register.service';
import {RegisterComponent} from './containers/register-view/register-view.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';

// export const ROUTES: Routes = [
//   { path: '', component: RegisterComponent }
// ];

@NgModule({
  declarations: [RegisterComponent, RegisterFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [RegisterService],
})
export class RegisterModule {}
