import {AuthState} from './auth.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as dayjs from 'dayjs';

const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUserId = createSelector(selectAuthState, ({id}) => id);
export const selectToken = createSelector(selectAuthState, ({token}) => token);
export const selectIsAuthenticated = createSelector(
  selectToken,
  (token) => !!token
);
export const selectExpiration = createSelector(selectAuthState, ({expiresAt}) => expiresAt);
export const selectSignInFailedReason = createSelector(selectAuthState, ({signInFailedReason}) => signInFailedReason);
export const selectRegisterFailedReason = createSelector(selectAuthState, ({registerFailedReason}) => registerFailedReason);
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
