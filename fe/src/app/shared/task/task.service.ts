import { Task } from './task.interface';
import {Observable} from 'rxjs';
import api from '../../../api';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Page, PageRequest} from '../../pages/backlog/pagination.datasource';

@Injectable()
export class TasksService {
  constructor(
    private http: HttpClient,
  ) {}

  getTasks(): Observable<{}> {
    return this.http
      .get(`${api.BASEURL}${api.TASKS}`);
  }

  getTasksPerPage(request: PageRequest<Task>): Observable<Page<Task>> {
    const params = {
      pageNumber: request.page,
      pageSize: request.size,
      sortOrder: request.sort.order,
      sortProperty: request.sort.property
    };
    return this.http.get<Page<Task>>(`${api.BASEURL}${api.TASKS}`); // , {params}
  }

  createTask({ title, description, status }: Task): Observable<{}> {
    return this.http
      .post(`${api.BASEURL}${api.TASKS}`, { title, description, status });
  }
}
