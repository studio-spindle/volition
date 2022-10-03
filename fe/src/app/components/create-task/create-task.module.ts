import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateTaskComponent} from './create-task.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InputModule} from '../../../../shared/components/input/input.module';

@NgModule({
  declarations: [
    CreateTaskComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputModule,
  ],
  exports: [CreateTaskComponent]
})
export class CreateTaskModule { }
