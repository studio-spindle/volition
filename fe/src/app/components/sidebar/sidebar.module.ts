import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import {SidebarHeaderComponent} from './sidebar-header/sidebar-header.component';
import {NavigationModule} from '../navigation/navigation.module';
import {ColumnsModule, ProfileImageModule, IconModule} from '@shared';

@NgModule({
  declarations: [
    SidebarComponent,
    SidebarHeaderComponent,
  ],
  imports: [
    CommonModule,
    ColumnsModule,
    ProfileImageModule,
    NavigationModule,
    IconModule,
  ],
  exports: [
    SidebarComponent,
    SidebarHeaderComponent
  ]
})
export class SidebarModule { }
