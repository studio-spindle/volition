import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserProfileService} from '../../services/user-profile.service';
import * as UserStateActions from './user-profile.actions';
import {exhaustMap} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserProfileModel} from './user-profile.model';

@Injectable()
export class UserProfileEffects {

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserStateActions.getUserProfileById),
      exhaustMap(({id}) =>
        this.userService.getUserProfile$(id).pipe(
          map((user: UserProfileModel) => UserStateActions.getUserProfileSuccess(user))
        )
      )
  ));

  constructor(
    private actions$: Actions,
    private userService: UserProfileService
  ) {}
}
