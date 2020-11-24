import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardComponent } from './containers/user-dashboard/user-dashboard.component';
import { UserDashboardService } from './user-dashboard.service';

@NgModule({
  declarations: [UserDashboardComponent],
  imports: [CommonModule],
  exports: [UserDashboardComponent],
  providers: [UserDashboardService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserDashboardModule {}
