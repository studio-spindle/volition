import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import RegisterValues from '../../models/LoginValues.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass'],
})
export class LoginFormComponent implements OnInit {

  @Output()
  update: EventEmitter<RegisterValues> = new EventEmitter<RegisterValues>();

  @Input() isCreated: boolean;
  @Input() signInFailedReason: string;

  constructor() {}

  ngOnInit(): void {}

  handleSubmit(value: RegisterValues, isValid: boolean) {
    this.signInFailedReason = undefined;

    if (isValid) {
      this.update.emit(value);
    }
  }
}
