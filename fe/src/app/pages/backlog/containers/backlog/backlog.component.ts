import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Task} from '@shared';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-backlog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.sass']
})
export class BacklogComponent implements OnInit {

  tasks$ = new BehaviorSubject<Task[]>(null);

  constructor(
    // private store: Store,
  ) { }

  ngOnInit(): void {
    // TODO: move this to a task list component in ../../components/..
    // this.store.dispatch(getTasks());
    // this.store.dispatch(new GetUserInfo());

    // this.store.getTasks().subscribe((res) => {
    //   console.log('res: ', res);
    // });

    // this.user$.subscribe((user) => {
    //   console.log('===> ', user);
    // });
  }
}
