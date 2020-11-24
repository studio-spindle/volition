import { Task } from './models/task.interface';
import {Observable, throwError} from 'rxjs';
import api from '../../../api';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class BacklogService {
  constructor(
    private http: HttpClient,
  ) {}

  getTasks(): Task[] {
    return [
      { title: 'foobars', status: 'todo' },
      { title: 'baz', status: 'todo' },
      { title: 'qux', status: 'todo' },
    ];
  }

  addTask({ title, description, status }: Task): Observable<{}> {
    return this.http
      .post(`${api.BASEURL}${api.TASKS}`, { title, description, status });
  }
}
