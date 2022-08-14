import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {exhaustMap, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import jwt_decode, {JwtPayload} from 'jwt-decode';
import {Router} from '@angular/router';
import * as AuthStateActions from './auth.actions';
import * as dayjs from 'dayjs';
import {LocalStorageKeys} from '../../app.module';

@Injectable()
export class AuthEffects {

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.register),
      exhaustMap(action =>
        this.authService.register$(action.credentials).pipe(
          map(() => AuthStateActions.registerSuccess()),
          tap(() => {
            this.router.navigate(['/']);
          }),
          catchError(response => {
            return of(AuthStateActions.registerFailure({ error: response.error.message }));
          })
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.login),
      exhaustMap(action =>
        this.authService.login$(action.credentials).pipe(
          map(({ accessToken, id }) => {
            const {exp} = jwt_decode<JwtPayload>(accessToken);
            const expiresAt = dayjs.unix(exp).format();

            return AuthStateActions.loginSuccess({
              token: accessToken,
              username: action.credentials.username,
              expiresAt,
              id
            });
          }),
          tap(() => {
            this.router.navigate([action.returnUrl || '/']);
          }),
          catchError(response => of(AuthStateActions.loginFailure({ error: response.error.message })))
    ))
  ));

  logOut$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthStateActions.logOut),
      tap(() => {
        // reminder: state is cleared in reducer
        localStorage.removeItem(LocalStorageKeys.AUTH);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
