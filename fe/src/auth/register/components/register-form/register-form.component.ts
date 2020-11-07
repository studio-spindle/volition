import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import RegisterValues from '../../models/RegisterValues.interface';

// This import only works if this stays a monorepo. Otherwise make a separate package from it
import { passwordMatch } from '../../../../../../be/src/validation-helpers';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.sass'],
})
export class RegisterFormComponent implements OnInit {
  passwordPattern: RegExp;

  @Output()
  update: EventEmitter<RegisterValues> = new EventEmitter<RegisterValues>();

  @Input() isCreated: boolean;
  @Input() saveFailedReason: string;

  constructor() {}

  ngOnInit(): void {
    this.passwordPattern = passwordMatch;
  }

  handleSubmit(value: RegisterValues, isValid: boolean) {
    this.saveFailedReason = undefined;

    if (isValid) {
      this.update.emit(value);
    }
  }
}
