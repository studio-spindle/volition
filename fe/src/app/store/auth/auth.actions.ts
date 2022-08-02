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

export const login = createAction(
  '[AuthState] Login',
  props<{ credentials: { username: string; password: string }, returnUrl?: string }>()
);

export const loginSuccess = createAction(
  '[AuthState] Logged in sucessfully',
  props<AuthState>()
);

export const loginFailure = createAction(
  '[AuthState] Login failed',
  props<{ error: string }>()
);

export const logOut = createAction(
  '[AuthState] Logout',
);
