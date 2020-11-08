import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginService} from '../../login.service';
import {User} from '../../../models/User.interface';
import {FormGroup} from '@angular/forms';

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

  @Output()
  update: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {}

  checkFormValidity(isValid: boolean) {
    this.buttonEnabled = isValid;
  }

  loginUser(event: FormGroup) {
    const { value }: { value: User } = event;

    console.log(value);

    this.loginService.login(value)
      .subscribe({
        next: ({ accessToken }) => {
          console.log(accessToken);

          // add token to localstorage
          // redirect
          // on the home url it will check whether the token is set and validates if the token is still active
          // this.router.navigate(['/']);
        },
        error: ({error: {message}}) => { this.signInFailedReason = message; },
    });
  }
}
