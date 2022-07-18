import {AuthState} from './auth.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as dayjs from 'dayjs';

const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectToken = createSelector(selectAuthState, (state: AuthState) => state.token);
export const selectIsAuthenticated = createSelector(
  selectToken,
  (token) => !!token
);
export const selectExpiration = createSelector(selectAuthState, (state: AuthState) => state.expiresAt);
export const selectSignInFailedReason = createSelector(selectAuthState, (state: AuthState) => state.signInFailedReason);
export const selectRegisterFailedReason = createSelector(selectAuthState, (state: AuthState) => state.selectRegisterFailedReason);
export const selectIsLoggedIn = createSelector(
  selectExpiration,
  (expiresAt) => {
    return dayjs().isBefore(expiresAt);
  }
);
export const selectIsLoggedOut = createSelector(
  selectIsLoggedIn,
  (loggedIn) => {
    return !loggedIn;
  }
);
