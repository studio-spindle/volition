import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BacklogComponent} from './containers/backlog/backlog.component';
import {HeaderModule} from '../../components/header/header.module';
import {SidebarModule} from '../../components/sidebar/sidebar.module';
import {NavigationModule} from '../../components/navigation/navigation.module';
import {TaskModule, InputComponent, ColumnsModule} from '@shared';

@NgModule({
  declarations: [
    BacklogComponent,
    InputComponent,
  ],
  imports: [
    TaskModule,
    ReactiveFormsModule,
    ColumnsModule,
    HeaderModule,
    SidebarModule,
    NavigationModule,
  ],
  exports: [BacklogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BacklogModule {}
