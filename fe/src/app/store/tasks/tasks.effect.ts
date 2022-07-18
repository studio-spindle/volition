import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as TasksActions from './tasks.actions';
import {Task, TasksService} from '@shared';
import {exhaustMap, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {addTask} from './tasks.actions';
import * as AuthStateActions from '../auth/auth.actions';

@Injectable()
export class TasksEffects {

  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.getTasks),
      exhaustMap(action =>
        this.tasksService.getTasks().pipe(
          map((tasks: Task[]) => {
            return TasksActions.addTasks({ tasks });
          }),
          catchError(error => of(TasksActions.addTasksFailed({ error })))
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.addTask),
      exhaustMap(action =>
        this.tasksService.createTask(action.task).pipe(
          map((task: Task) => {
            return TasksActions.addTask({task});
          }),
          catchError(error => of(TasksActions.addTaskFailed({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private tasksService: TasksService
  ) {}
}
