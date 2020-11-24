import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngxs/store';
import {AuthState} from '../../../state/Auth.state';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store,
  ) {}

  canActivate(_, state: RouterStateSnapshot) {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (!isAuthenticated) {
      this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    return true;
  }
}
