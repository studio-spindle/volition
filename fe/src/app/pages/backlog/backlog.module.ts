import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BacklogComponent} from './containers/backlog/backlog.component';
import {HeaderModule} from '../../components/header/header.module';
import {SidebarModule} from '../../components/sidebar/sidebar.module';
import {NavigationModule} from '../../components/navigation/navigation.module';
import {TaskModule, ColumnsModule} from '@shared';
import {CreateTaskModule} from '../../components/create-task/create-task.module';

@NgModule({
  declarations: [
    BacklogComponent,
  ],
  imports: [
    TaskModule,
    ColumnsModule,
    HeaderModule,
    SidebarModule,
    NavigationModule,
    CreateTaskModule,
  ],
  exports: [BacklogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BacklogModule {}
