import {Component} from '@angular/core';
import {PaginationDataSource, Sort} from '../../pages/backlog/pagination.datasource';
import {TasksService} from '../task/task.service';
import {Task} from '../task/task.interface';

export interface TaskQuery {
  search: string;
  registration: Date;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass'],
})
export class TasksComponent {
  initialSort: Sort<Task> = {property: 'title', order: 'desc'};

  dataSource = new PaginationDataSource<Task, TaskQuery>(
    (request, query) => this.tasks.getTasksPerPage(request),
    {property: 'title', order: 'desc'},
    {search: '', registration: undefined}
  );

  constructor(private tasks: TasksService) {}
}
