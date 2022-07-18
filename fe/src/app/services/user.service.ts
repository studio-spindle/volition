import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import api from '../../api';
import {Observable} from 'rxjs';
import {UserModel} from '../store/user/user.model';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
  ) {}

  getUserInfo$(): Observable<UserModel> {
    // this.store.dispatch(new GetUserInfo());

    return this.http
      .get<UserModel>(`${api.BASEURL}${api.USER}`);
  }
}
