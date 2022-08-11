import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import api from '../../api';
import {Observable} from 'rxjs';
import {UserProfileModel} from '../store/user-profile/user-profile.model';

@Injectable()
export class UserProfileService {

  constructor(
    private http: HttpClient,
  ) {}

  getUserProfile$(id: number): Observable<UserProfileModel> {
    return this.http
      .get<UserProfileModel>(`${api.BASEURL}${api.USER_PROFILE}/${id}`);
  }
}
