import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';

@NgModule({
  declarations: [TaskComponent],
  imports: [CommonModule],
  exports: [TaskComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskModule {}
