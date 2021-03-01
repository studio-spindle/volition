import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BacklogComponent} from './containers/backlog/backlog.component';

import {TaskModule} from '../../shared/task/task.module';
import {TasksModule} from '../../shared/tasks/tasks.module';
import {TasksService} from '../../shared/task/task.service';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [BacklogComponent],
  imports: [CommonModule, TaskModule, TasksModule, ReactiveFormsModule],
  exports: [BacklogComponent],
  providers: [TasksService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BacklogModule {}
