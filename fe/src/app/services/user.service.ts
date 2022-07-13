import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import api from '../../api';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
  ) {}

  getUserInfo() {
    return this.http
      .get(`${api.BASEURL}${api.USER}`);
  }
}
