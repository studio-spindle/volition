import {createAction, props} from '@ngrx/store';
import {Task} from '@shared';

export const getTasks = createAction(
  '[Task] GetTasks',
);

export const addTask = createAction(
  '[Task] AddTask (single)',
  props<{ task: Task }>()
);

export const addTaskFailed = createAction(
  '[Task] AddTask (single) failed',
  props<{ error: string }>()
);

export const addTasks = createAction(
  '[Task] AddTasks (multiple)',
  props<{ tasks: Task[] }>()
);

export const addTasksFailed = createAction(
  '[Task] AddTasks (multiple) failed',
  props<{ error: string }>()
);
