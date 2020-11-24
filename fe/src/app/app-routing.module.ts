import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth/shared/guards/auth.guard';
import {BacklogComponent} from './pages/backlog/containers/backlog/backlog.component';
import {UserDashboardComponent} from './pages/user-dashboard/containers/user-dashboard/user-dashboard.component';
import {UserDashboardModule} from './pages/user-dashboard/user-dashboard.module';
import {BacklogModule} from './pages/backlog/backlog.module';

const ROUTES: Routes = [
  { path: '', canActivate: [AuthGuard], component: BacklogComponent },
  { path: '', canActivate: [AuthGuard], component: UserDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule, BacklogModule, UserDashboardModule],
})
export class AppRoutingModule {}
