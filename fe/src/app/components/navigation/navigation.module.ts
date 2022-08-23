import {NgModule} from '@angular/core';
import {NavigationComponent} from './navigation.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {IconModule} from '@shared';

@NgModule({
  imports: [RouterModule, CommonModule, IconModule],
  declarations: [NavigationComponent],
  exports: [NavigationComponent]
})
export class NavigationModule {}
