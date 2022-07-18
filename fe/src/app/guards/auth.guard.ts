import {Injectable, OnDestroy} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {selectIsAuthenticated} from '../store/auth/auth.selectors';
import {Subject, takeUntil} from 'rxjs';
import {AuthState} from '../store/auth/auth.state';

@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {
  destroy$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private store: Store<AuthState>,
  ) {}

  canActivate(_, routerState: RouterStateSnapshot) {
    this.store.select(selectIsAuthenticated)
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuthenticated) => {
        if (isAuthenticated === false) {
          this.router.navigate(['auth/login'], { queryParams: { returnUrl: routerState.url } });
          return false;
        }
    });
    return true;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
