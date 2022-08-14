import {ProfileImageComponent, SafePipeModule} from '@shared';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [ProfileImageComponent],
  exports: [
    ProfileImageComponent
  ],
  imports: [CommonModule, SafePipeModule]
})
export class ProfileImageModule {}
