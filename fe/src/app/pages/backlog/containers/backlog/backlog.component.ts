import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Task} from '@shared';
import {FormBuilder, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-backlog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.sass']
})
export class BacklogComponent implements OnInit {

  tasks$ = new BehaviorSubject<Task[]>(null);

  taskForm = this.formBuilder.group({
    title: ['' , Validators.compose([
      Validators.minLength(4),
      Validators.maxLength(60),
      Validators.required,
    ])],
    description: ['' , Validators.compose([
      Validators.minLength(4),
      Validators.maxLength(600),
    ])],
  });

  constructor(
    private formBuilder: FormBuilder,
    // private store: Store,
  ) { }

  ngOnInit(): void {
    // this.store.dispatch(getTasks());
    // this.store.dispatch(new GetUserInfo());

    // this.store.getTasks().subscribe((res) => {
    //   console.log('res: ', res);
    // });

    // this.user$.subscribe((user) => {
    //   console.log('===> ', user);
    // });
  }

  onSubmit() {
    const { value } = this.taskForm;

    if (this.taskForm.valid) {
      // this.store.dispatch(addTask({ title: value.title, description: value.description, status: TaskStatus.OPEN }));
    }
  }
}
