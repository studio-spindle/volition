import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserProfileState} from './user-profile.state';

const selectUserProfile = createFeatureSelector<UserProfileState>('userProfile');

export const selectPhoto = createSelector(selectUserProfile, ({photo}) => photo);
