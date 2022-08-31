import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../../models/User.interface';
import {FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {register, clearRegisterFailure} from 'src/app/store/auth/auth.actions';
import {selectRegisterFailedReason} from '../../../store/auth/auth.selectors';

// TODO: This component should only be visible if you were invited to join. (create generic password)

@Component({
  selector: 'app-register',
  template: `
    <app-auth-form
      (submitted)="handleRegister($event)"
      (isValidForm)="checkFormValidity($event)"
    >
      <h1>Registreer</h1>
      <ng-container error>{{ saveFailedReason$ | async }}</ng-container>
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
  saveFailedReason$: Observable<string> = this.store.select(selectRegisterFailedReason);

  @Output()
  update: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {}

  checkFormValidity(isValid: boolean) {
    this.buttonEnabled = isValid;
  }

  handleRegister(event: FormGroup) {
    const { value }: { value: User } = event;

    this.store.dispatch(clearRegisterFailure());
    this.store.dispatch(register({ credentials: value }));
  }
}
