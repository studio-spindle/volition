import {createReducer, on} from '@ngrx/store';
import {AuthState} from './auth.state';
import * as AuthStateActions from './auth.actions';

export const initialState: AuthState = {
  token: null,
  username: null,
  expiresAt: null,
  signInFailedReason: null,
  selectRegisterFailedReason: null,
};

export const authStateReducer = createReducer(
  initialState,
  on(AuthStateActions.loginSuccess, (state, newState: AuthState) => ({
    ...state,
    ...newState
  })),
  on(AuthStateActions.logOut, () => {
    return initialState; // removes authentication from state
  }),
  on(AuthStateActions.registerFailure, (state, newState: { error: string }) => ({
    ...state,
    selectRegisterFailedReason: newState.error
  })),
  on(AuthStateActions.clearRegisterFailure, (state) => ({
    ...state,
    selectRegisterFailedReason: null
  })),
  on(AuthStateActions.loginFailure, (state, newState: { error: string }) => ({
    ...state,
    signInFailedReason: newState.error
  })),
  on(AuthStateActions.clearLoginFailure, (state) => ({
    ...state,
    signInFailedReason: null
  })),
);
