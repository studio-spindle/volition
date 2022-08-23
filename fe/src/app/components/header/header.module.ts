import {NgModule} from '@angular/core';
import {ColumnsModule, ProfileImageModule} from '@shared';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './header.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [HeaderComponent],
  imports: [ColumnsModule, RouterModule, CommonModule, ProfileImageModule],
  exports: [HeaderComponent]
})
export class HeaderModule {}
