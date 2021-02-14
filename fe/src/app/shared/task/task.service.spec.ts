import {TasksService} from './task.service';
import {Task} from './task.interface';
import {of} from 'rxjs';
// import {HttpErrorResponse} from '@angular/common/http';

let httpClientSpy: { post: jasmine.Spy, get: jasmine.Spy };
let service: TasksService;

const taskFixture: Task = {
  title: 'Some task title',
  description: 'A description of this task',
  status: 'OPEN',
};

describe('TasksService', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    service = new TasksService(httpClientSpy as any);
  });

  describe('getTasks', () => {
    it('should return tasks when successful', () => {
      const tasks: Task[] = [taskFixture, taskFixture];
      httpClientSpy.get.and.returnValue(of(tasks));
      service.getTasks().subscribe(
        heroes => expect(heroes).toEqual(tasks, 'expected tasks'),
        fail
      );
      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });
    xit('should return a message when you have no permission', () => {
      // TODO: create unsuccessful flow
    });
    xit('should return an error when the server returns a 404', () => {
      // const errorResponse = new HttpErrorResponse({
      //   error: 'test 404 error',
      //   status: 404, statusText: 'Not Found'
      // });
      // TODO: create unsuccessful flow
    });
  });

  describe('createTask', () => {
    it('should return the task when created successful', () => {
      const newTask: Task = taskFixture;
      const createdTask: Task = {
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        userId: 1,
        id: 6
      };
      httpClientSpy.post.and.returnValue(of(createdTask));
      service.createTask(newTask).subscribe(
        task => expect(task).toEqual(createdTask, 'expected task'),
        fail
      );
      expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });
    xit('should return a message when you have no permission', () => {
      // TODO: create unsuccessful flow
    });
    xit('should return an error when the server returns a 404', () => {
      // TODO: create unsuccessful flow
    });
  });
});
