import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import {TasksService} from './task.service';

@NgModule({
  declarations: [TaskComponent],
  imports: [CommonModule],
  exports: [TaskComponent],
  providers: [TasksService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskModule {}
