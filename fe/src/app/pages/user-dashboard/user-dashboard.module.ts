import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardComponent } from './containers/user-dashboard/user-dashboard.component';
import { UserDashboardService } from './user-dashboard.service';
import {HeaderModule} from '../../components/header/header.module';

@NgModule({
  declarations: [UserDashboardComponent],
  imports: [CommonModule, HeaderModule],
  exports: [UserDashboardComponent],
  providers: [UserDashboardService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserDashboardModule {}
