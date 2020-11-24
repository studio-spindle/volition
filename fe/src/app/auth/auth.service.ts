import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import api from '../../api';
import {User} from './models/User.interface';
import * as dayjs from 'dayjs';
import {Store} from '@ngxs/store';
import {AuthState} from '../state/Auth.state';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  register({ username, password }: User): Observable<{}> {
    return this.http
      .post(`${api.BASEURL}${api.API_REGISTER}`, { username, password });
  }

  login({ username, password }: User): Observable<{ accessToken?: string }> {
    return this.http
      .post(`${api.BASEURL}${api.API_LOGIN}`, { username, password });
  }

  public isLoggedIn() {
    const expiration = this.store.selectSnapshot(AuthState.getExpiration);
    return dayjs().isBefore(expiration);
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }
}
