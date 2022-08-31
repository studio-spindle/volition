import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {BacklogComponent} from './pages/backlog/containers/backlog/backlog.component';
import {UserDashboardComponent} from './pages/user-dashboard/containers/user-dashboard/user-dashboard.component';
import {UserDashboardModule} from './pages/user-dashboard/user-dashboard.module';
import {BacklogModule} from './pages/backlog/backlog.module';
import {LoginModule} from './pages/login/login.module';
import {RegisterModule} from './pages/register/register.module';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', canActivate: [AuthGuard], component: BacklogComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: UserDashboardComponent },
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: () => LoginModule },
      { path: 'register', loadChildren: () => RegisterModule },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [
    RouterModule,
    LoginModule,
    RegisterModule,
    BacklogModule,
    UserDashboardModule
  ],
})
export class AppRoutingModule {}
