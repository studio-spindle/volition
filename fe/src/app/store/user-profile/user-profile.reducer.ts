import {createReducer, on} from '@ngrx/store';
import {UserProfileState} from './user-profile.state';
import * as UserProfileActions from './user-profile.actions';

const initialState: UserProfileState = {
  photo: null,
  organisation: null,
};

export const userProfileReducer = createReducer(
  initialState,
  on(UserProfileActions.getUserProfileSuccess, (state, userProfile) => ({
    ...state,
    ...userProfile
  })),
);
