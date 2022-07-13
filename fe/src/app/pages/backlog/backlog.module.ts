import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BacklogComponent} from './containers/backlog/backlog.component';

import {TaskModule, TasksService, InputComponent, HeaderComponent, ColumnsModule} from '@shared';

@NgModule({
  declarations: [BacklogComponent, InputComponent, HeaderComponent],
  imports: [TaskModule, ReactiveFormsModule, ColumnsModule],
  exports: [BacklogComponent],
  providers: [TasksService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BacklogModule {}
