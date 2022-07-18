export enum TaskStatus {
  'TODO',
  'OPEN',
  'DONE'
}

export interface Task {
  title: string;
  description?: string;
  status: TaskStatus;
  userId?: number;
  id?: number;
}
