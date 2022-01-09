import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BacklogComponent} from './containers/backlog/backlog.component';

import {TaskModule, TasksService, InputComponent} from '@shared';

@NgModule({
  declarations: [BacklogComponent, InputComponent],
  imports: [TaskModule, ReactiveFormsModule],
  exports: [BacklogComponent],
  providers: [TasksService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BacklogModule {}
