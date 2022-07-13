import {UserStateModel} from './UserStateModel';
import {Action, State} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {UserService} from '../../services/user.service';
import {GetUserInfo} from 'actions';

@State<UserStateModel>({
  name: 'user',
  defaults: {
    username: null
  }
})
@Injectable()
export class UserState {

  constructor(private userService: UserService) {}

  @Action(GetUserInfo)
  getUserInfo() {
    return this.userService.getUserInfo();
  }
}
