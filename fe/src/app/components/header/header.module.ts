import {NgModule} from '@angular/core';
import {ColumnsModule} from '@shared';
import {NavigationComponent} from '../navigation/navigation.component';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './header.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [HeaderComponent, NavigationComponent],
  imports: [ColumnsModule, RouterModule, CommonModule],
  exports: [HeaderComponent]
})
export class HeaderModule {}
