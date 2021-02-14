import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/task/task.interface';

@Component({
  selector: 'app-task',
  styleUrls: ['task.component.sass'],
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnChanges, OnInit {
  title: string;

  @Input()
  item: Task;

  constructor() {}

  ngOnChanges(changes) {
    console.log(changes);
  }

  ngOnInit() {
    console.log('ngOnInit');
  }
}
