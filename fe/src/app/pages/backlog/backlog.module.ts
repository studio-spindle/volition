import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BacklogComponent} from './containers/backlog/backlog.component';

import {TaskModule} from '../../shared/task/task.module';
import {BacklogService} from './backlog.service';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [BacklogComponent],
  imports: [CommonModule, TaskModule, ReactiveFormsModule],
  exports: [BacklogComponent],
  providers: [BacklogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BacklogModule {}
