export enum TaskStatus {
  'TODO',
  'OPEN',
  'DONE'
}

export interface Task {
  title: string;
  status: TaskStatus;
  description?: string;
  userId?: number;
  id?: number;
}
