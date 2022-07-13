import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Task} from '@shared';
import {FormBuilder, Validators} from '@angular/forms';
import {TasksState} from '../../../../store/tasks/Tasks.state';
import {Observable} from 'rxjs';
import {AddTask, GetTasks, GetUserInfo} from 'actions';
import {UserState} from '../../../../store/user/User.state';
import {UserStateModel} from '../../../../store/user/UserStateModel';

@Component({
  selector: 'app-backlog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.sass']
})
export class BacklogComponent implements OnInit {
  @Select(TasksState) tasks$: Observable<{ tasks: Task[] }>;
  @Select(UserState) user$: Observable<UserStateModel>;

  tasks: Task[];

  taskForm = this.formBuilder.group({
    title: ['' , Validators.compose([
      Validators.minLength(4),
      Validators.maxLength(60),
    ])],
    description: ['' , Validators.compose([
      Validators.minLength(4),
      Validators.maxLength(600),
    ])],
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetTasks());
    this.store.dispatch(new GetUserInfo());

    // TODO: do not subscribe, but pipe through the observable :)
    this.tasks$.subscribe((tasks) => {
      this.tasks = tasks.tasks;
    });

    this.user$.subscribe((user) => {
      console.log('===> ', user);
    });
  }

  onSubmit() {
    const { value }: { value: Task } = this.taskForm;
    if (this.taskForm.valid) {
      this.store.dispatch(new AddTask(value));
    }
  }
}
