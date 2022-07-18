import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {exhaustMap, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import jwt_decode, {JwtPayload} from 'jwt-decode';
import {Router} from '@angular/router';
import * as AuthStateActions from './auth.actions';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthEffects {

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.register),
      exhaustMap(action =>
        this.authService.register$(action.credentials).pipe(
          map(() => AuthStateActions.registerSuccess()),
          catchError(error => of(AuthStateActions.registerFailure({ error })))
        )
      )
    )
  );

  login = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.login),
      exhaustMap(action =>
        this.authService.login$(action.credentials).pipe(
          map(({ accessToken }) => {
            const {exp} = jwt_decode<JwtPayload>(accessToken);
            const expiresAt = dayjs.unix(exp).format();

            return AuthStateActions.loginSuccess({
              token: accessToken,
              username: action.credentials.username,
              expiresAt
            });
          }),
          tap(() => {
            // redirect to home route when succesfully logged in
            this.router.navigate(['/']);
          }),
          catchError(error => of(AuthStateActions.loginFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
