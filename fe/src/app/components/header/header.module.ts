import {NgModule} from '@angular/core';
import {ColumnsModule, SafePipeModule} from '@shared';
import {NavigationComponent} from '../navigation/navigation.component';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './header.component';
import {CommonModule} from '@angular/common';
import {ProfileImageModule} from '../../../../shared/components/profile-image/profile-image.module';

@NgModule({
  declarations: [HeaderComponent, NavigationComponent],
  imports: [ColumnsModule, RouterModule, CommonModule, ProfileImageModule],
  exports: [HeaderComponent]
})
export class HeaderModule {}
