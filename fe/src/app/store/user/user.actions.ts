import {createAction, props} from '@ngrx/store';
import {UserState} from './user.state';

export const getUserInfo = createAction(
  '[UserState] GetUserInfo'
);

export const getUserInfoSuccess = createAction(
  '[UserState] GetUserInfo success!',
  props<UserState>()
)
