import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {AuthStateModel} from './AuthState.interface';
import {AuthService} from '../../auth/auth.service';
import {Register, Login, Logout} from 'actions';
import {tap} from 'rxjs/operators';
import * as dayjs from 'dayjs';
import jwt_decode, {JwtPayload} from 'jwt-decode';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null,
    expiresAt: null,
  }
})
@Injectable()
export class AuthState {
  @Selector()
  static getToken(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Selector()
  static getExpiration(state: AuthStateModel): string | null {
    return state.expiresAt;
  }

  @Selector()
  static isLoggedIn(state: AuthStateModel) {
    const expiration = this.getExpiration(state);
    return dayjs().isBefore(expiration);
  }

  @Selector()
  static isLoggedOut(state: AuthStateModel) {
    return !this.isLoggedIn(state);
  }

  constructor(private authService: AuthService) {}

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    return this.authService.register(action.payload);
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap(({ accessToken }: { accessToken: string }) => {
        const {exp} = jwt_decode<JwtPayload>(accessToken);
        const expiresAt = dayjs.unix(exp).format();

        ctx.patchState({
          token: accessToken,
          username: action.payload.username,
          expiresAt
        });
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      token: null,
      username: null,
      expiresAt: null,
    });
  }
}
