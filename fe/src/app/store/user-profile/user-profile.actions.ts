import {createAction, props} from '@ngrx/store';
import {UserProfileState} from './user-profile.state';

export const getUserProfileById = createAction(
  '[UserProfileState] GetUserProfile',
  props<{id: number}>()
);

export const getUserProfileSuccess = createAction(
  '[UserProfileState] GetUserProfile success!',
  props<UserProfileState>()
);
