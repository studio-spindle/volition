import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BacklogComponent} from './containers/backlog/backlog.component';
import {TaskModule, InputComponent, ColumnsModule} from '@shared';
import {HeaderModule} from '../../components/header/header.module';

@NgModule({
  declarations: [BacklogComponent, InputComponent],
  imports: [TaskModule, ReactiveFormsModule, ColumnsModule, HeaderModule],
  exports: [BacklogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BacklogModule {}
