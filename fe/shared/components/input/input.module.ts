import {NgModule} from '@angular/core';
import {InputComponent} from '@shared';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [InputComponent]
})
export class InputModule {}
