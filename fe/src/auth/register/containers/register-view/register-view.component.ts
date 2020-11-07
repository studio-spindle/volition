import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RegisterService} from '../../register.service';
import RegisterValues from '../../models/RegisterValues.interface';

// TODO: This component should only be visible if you were invited to join. (create generic password)

@Component({
  selector: 'app-register',
  template: `
    <app-register-form
      (update)="handleRegister($event)"
      [isCreated]="registerSuccessful"
      [saveFailedReason]="saveFailedReason"
    ></app-register-form>
  `,
})
export class RegisterComponent implements OnInit {
  registerSuccessful: boolean;
  saveFailedReason: string;

  @Output()
  update: EventEmitter<RegisterValues> = new EventEmitter<RegisterValues>();

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {}

  handleRegister(event: RegisterValues) {
    this.registerService.register(event)
      .subscribe({
        next: () => { this.registerSuccessful = true; },
        error: ({ error: { message } }) => { this.saveFailedReason = message; },
      });
  }
}
