import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

// got icons from: https://www.flaticon.com/uicons

export enum IconPaths {
  ANGLE_SMALL_DOWN = '/assets/icons/angle-small-down.svg',
  SIGN_OUT_ALT = '/assets/icons/sign-out-alt.svg',
  APPS_SORT = '/assets/icons/apps-sort.svg'
}

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: [
    './icon.component.sass',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnInit {

  @Input()
  iconUri: IconPaths;

  @Input()
  altText: string;

  constructor() { }

  ngOnInit(): void {
  }
}
