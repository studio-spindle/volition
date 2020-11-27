import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthFormComponent} from './components/auth-form/auth-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from '../../guards/auth.guard';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
  ],
  exports: [
    AuthFormComponent,
  ]
})
export class SharedModule {}
