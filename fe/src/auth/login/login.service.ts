import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import api from '../../api';
import { User } from '../models/User.interface';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  login({ username, password }: User): Observable<any> {
    return this.http
      .post(`${api.BASEURL}${api.API_LOGIN}`, { username, password });
  }
}
