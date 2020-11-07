import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginService} from '../../login.service';
import LoginValues from '../../models/LoginValues.interface';

@Component({
  selector: 'app-register',
  template: `
    <app-login-form
      (update)="handleLogin($event)"
      [signInFailedReason]="signInFailedReason"
    ></app-login-form>
  `,
})
export class LoginComponent implements OnInit {
  registerSuccessful: boolean;
  signInFailedReason: string;

  @Output()
  update: EventEmitter<LoginValues> = new EventEmitter<LoginValues>();

  constructor(
    private loginService: LoginService,
    // private router: Router
  ) { }

  ngOnInit(): void {}

  handleLogin(event: LoginValues) {
    this.loginService.login(event)
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
