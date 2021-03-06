import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './containers/register-view/register-view.component';
import {SharedModule} from '../shared/shared.module';

export const ROUTES: Routes = [
  { path: '', component: RegisterComponent }
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
  ],
})
export class RegisterModule {}
