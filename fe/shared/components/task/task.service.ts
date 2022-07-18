import {Task} from './task.interface';
import {Observable} from 'rxjs';
import api from '../../../src/api';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class TasksService {
  constructor(
    private http: HttpClient,
  ) {}

  getTasks(): Observable<{}> {
    return this.http
      .get(`${api.BASEURL}${api.TASKS}`);
  }

  createTask({ title, description, status }: Task): Observable<{}> {
    return this.http
      .post(`${api.BASEURL}${api.TASKS}`, { title, description, status });
  }
}
