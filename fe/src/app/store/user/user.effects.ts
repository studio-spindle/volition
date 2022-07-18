import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../services/user.service';
import * as UserStateActions from './user.actions';
import {exhaustMap} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserModel} from './user.model';

@Injectable()
export class UserEffects {

  getUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserStateActions.getUserInfo),
      exhaustMap(() =>
        this.userService.getUserInfo$().pipe(
          map((user: UserModel) => {
            return UserStateActions.getUserInfoSuccess(user);
          })
        )
      )
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
