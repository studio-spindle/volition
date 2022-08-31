import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input.component.html',
  styleUrls: [
    './input.component.sass',
    '../../../shared/styles/spacing.sass',
  ]
})
export class InputComponent {
  @Input()
  label: string;

  @Input()
  name: string;

  @Input()
  control: AbstractControl;
}
