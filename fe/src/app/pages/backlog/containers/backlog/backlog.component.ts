import {Component, OnInit} from '@angular/core';
import {BacklogService} from '../../backlog.service';
import {Task} from '../../models/task.interface';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.sass']
})
export class BacklogComponent implements OnInit {
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
    private tasksService: BacklogService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.tasks = this.tasksService.getTasks();
  }

  onSubmit() {
    console.log('form is submitted...');
    const { value }: { value: Task } = this.taskForm;
    if (this.taskForm.valid) {
      console.log('this form is valid');
      this.tasksService.addTask(value).subscribe((res) => {
        console.log('res...? ', res);
      }, (error) => {
        console.log('Error', error);
      });
    }
  }
}
