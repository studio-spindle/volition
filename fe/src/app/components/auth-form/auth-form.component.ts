import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

// This import only works if this stays a monorepo. Otherwise make a separate package from it
import { passwordMatch } from '../../../../../be/src/validation-helpers';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-auth-form',
  styleUrls: ['auth-form.component.sass'],
  templateUrl: './auth-form.component.html'
})
export class AuthFormComponent implements OnInit {
  @Output()
  isValidForm = new EventEmitter<boolean>();

  @Output()
  submitted = new EventEmitter<FormGroup>();

  form = this.formBuilder.group({
    username: ['', Validators.compose([
      Validators.minLength(4),
      Validators.maxLength(60),
      Validators.required,
    ])],
    password: ['', Validators.compose([
      Validators.pattern(passwordMatch),
      Validators.minLength(8),
      Validators.maxLength(60),
      Validators.required,
    ])],
  });

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form.statusChanges.pipe(
      debounceTime(100),
      map(() => this.form.valid),
      distinctUntilChanged()
    ).subscribe((value) => {
      this.isValidForm.emit(value);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }

  get usernameInvalid() {
    const message = [];
    const control = this.form.get('username');
    const { minlength, required } = control.errors || {};
    if (minlength) {
      message.push(`Minimaal ${minlength.requiredLength} karakters`);
    }
    if (required) {
      message.push('Gebruikersnaam is vereist');
    }
    return control.touched && message.join('');
  }

  get passwordInvalid() {
    const message = [];
    const control = this.form.get('password');
    const { minlength, required, pattern } = control.errors || {};
    if (minlength && !pattern) {
      message.push(`Minimaal ${minlength.requiredLength} karakters`);
    }
    if (pattern) {
      message.push('Moet ten minste bestaan uit: 1 hoofdletter, 1 kleine letter, 1 nummer of speciaal teken');
    }
    if (required) {
      message.push('Wachtwoord is vereist');
    }
    return control.touched && message.join('');
  }
}
