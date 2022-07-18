import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {User} from '../../../models/User.interface';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthState} from '../../../../store/auth/auth.state';
import * as AuthActions from '../../../../store/auth/auth.actions';
import {selectSignInFailedReason} from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  template: `
    <app-auth-form
      (submitted)="loginUser($event)"
      (isValidForm)="checkFormValidity($event)"
    >
      <h1>Login</h1>
      <ng-container error>{{ signInFailedReason$ | async }}</ng-container>
      <ng-container action>
        <button type="submit" [disabled]="!buttonEnabled">Login</button>
      </ng-container>
      <ng-container fallback>
        <a routerLink="/auth/register">Nog niet geregisteerd?</a>
      </ng-container>
    </app-auth-form>
  `,
})
export class LoginComponent implements OnInit {
  buttonEnabled = false;
  signInFailedReason$: Observable<string>;
  returnUrl: string;

  @Output()
  update: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private router: Router,
    private store: Store<AuthState>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params) => this.returnUrl = params.returnUrl);
  }

  checkFormValidity(isValid: boolean) {
    this.buttonEnabled = isValid;
  }

  loginUser(event: FormGroup) {
    const { value }: { value: User } = event;

    this.store.dispatch(AuthActions.login({ credentials: value }));
    this.signInFailedReason$ = this.store.select(selectSignInFailedReason);
  }
}
