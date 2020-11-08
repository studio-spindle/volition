import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import api from '../../api';
import { User } from '../models/User.interface';

@Injectable()
export class RegisterService {
  constructor(private http: HttpClient) {}

  register({ username, password }: User): Observable<{}> {
    return this.http
      .post(`${api.BASEURL}${api.API_REGISTER}`, { username, password });
  }
}
