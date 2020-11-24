import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../../models/User.interface';
import {FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';
import {Register} from 'actions';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

// TODO: This component should only be visible if you were invited to join. (create generic password)

@Component({
  selector: 'app-register',
  template: `
    <app-auth-form
      (submitted)="handleRegister($event)"
      (isValidForm)="checkFormValidity($event)"
    >
      <h1>Registreer</h1>
      <ng-container error>{{ saveFailedReason }}</ng-container>
      <ng-container action>
        <button type="submit" [disabled]="!buttonEnabled">Register</button>
      </ng-container>
      <ng-container fallback>
        <a routerLink="/auth/login">Al eerder geregistreerd?</a>
      </ng-container>
    </app-auth-form>
  `,
})
export class RegisterComponent implements OnInit {
  buttonEnabled = false;
  saveFailedReason: string;

  @Output()
  update: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {}

  checkFormValidity(isValid: boolean) {
    this.buttonEnabled = isValid;
  }

  handleRegister(event: FormGroup) {
    const { value }: { value: User } = event;

    this.store.dispatch(new Register(value)).pipe(
      catchError(({ error: { message }}) => {
        this.saveFailedReason = message;
        return of('');
      })
    );
  }
}
