import {NgModule} from '@angular/core';
import {AuthFormComponent} from './auth-form.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {InputModule} from '../../../../shared/components/input/input.module';

@NgModule({
  declarations: [
    AuthFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputModule,
  ],
  exports: [AuthFormComponent],
})
export class AuthFormModule {}
