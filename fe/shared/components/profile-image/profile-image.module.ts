import {SafePipeModule} from '../../pipes/safe/safe.pipe.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileImageComponent} from './profile-image.component';

@NgModule({
  declarations: [ProfileImageComponent],
  exports: [
    ProfileImageComponent
  ],
  imports: [CommonModule, SafePipeModule]
})
export class ProfileImageModule {}
