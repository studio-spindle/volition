import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Store} from '@ngxs/store';
import {Login} from 'actions';
import {User} from '../../../models/User.interface';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-login',
  template: `
    <app-auth-form
      (submitted)="loginUser($event)"
      (isValidForm)="checkFormValidity($event)"
    >
      <h1>Login</h1>
      <ng-container error>{{ signInFailedReason }}</ng-container>
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
  signInFailedReason: string;
  returnUrl: string;

  @Output()
  update: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private router: Router,
    private store: Store,
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

    this.store.dispatch(new Login(value))
      .pipe(
        catchError(({ error: { message }}) => {
          this.signInFailedReason = message;
          return of('');
        })
      ).subscribe(() => {
        const redirectUrl = this.returnUrl || '/';
        this.router.navigate([redirectUrl]);
    });
  }
}
