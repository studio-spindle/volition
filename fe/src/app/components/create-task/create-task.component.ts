import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {TaskStatus} from '@shared';
import {addTask} from '../../store/tasks/tasks.actions';

// TODO: Create a similar input mechanism as "Meet your command line"
//       on https://linear.app/

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTaskComponent implements OnInit {

  taskForm = this.formBuilder.group({
    title: ['' , Validators.compose([
      Validators.minLength(4),
      Validators.maxLength(60),
      Validators.required,
    ])],
    // description: ['' , Validators.compose([
    //   Validators.minLength(4),
    //   Validators.maxLength(600),
    // ])],
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const { value } = this.taskForm;

    console.log(this.taskForm);
    console.log(this.taskForm.errors);
    console.log(this.taskForm.valid);

    if (this.taskForm.valid) {
      this.store.dispatch(addTask({
        task: {
          title: value.title,
          // description: value.description,
          status: TaskStatus.OPEN
        }
      }));
    }
  }
}
