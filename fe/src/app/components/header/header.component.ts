import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState} from '../../store/auth/auth.state';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass', '../../../../shared/styles/width.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(
    private store: Store<AuthState>,
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.store.dispatch(AuthActions.logOut());
  }
}
