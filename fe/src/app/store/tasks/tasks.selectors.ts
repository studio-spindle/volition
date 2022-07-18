import {TasksState} from './tasks.state';

export const selectTasks = (state: TasksState) => state.tasks;
