export interface Task {
  title: string;
  description?: string;
  status: 'TODO' | 'OPEN' | 'DONE';
  userId?: number;
  id?: number;
}
