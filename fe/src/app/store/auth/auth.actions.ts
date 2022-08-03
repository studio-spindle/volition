import {createAction, props} from '@ngrx/store';
import {AuthState} from './auth.state';

export const register = createAction(
  '[AuthState] Register',
  props<{ credentials: { username: string; password: string } }>()
);

export const registerSuccess = createAction(
  '[AutState] Registered successfully',
);

export const registerFailure = createAction(
  '[AuthState] Register failed',
  props<{ error: string }>()
);

export const clearRegisterFailure = createAction(
  '[AutState] Registered failure cleared',
);

export const login = createAction(
  '[AuthState] Login',
  props<{ credentials: { username: string; password: string }, returnUrl?: string }>()
);

export const loginSuccess = createAction(
  '[AuthState] Logged in successfully',
  props<AuthState>()
);

export const loginFailure = createAction(
  '[AuthState] Login failed',
  props<{ error: string }>()
);

export const clearLoginFailure = createAction(
  '[AutState] Login failure cleared',
);

export const logOut = createAction(
  '[AuthState] Logout',
);
