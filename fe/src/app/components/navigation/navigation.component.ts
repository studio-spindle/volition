import {Component} from '@angular/core';
import {IconPaths} from '../../../../shared/components/icon/icon.component';

interface Nav {
  link: string;
  name: string;
  exact: boolean;
  icon: string;
  iconAltText: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: [
    'navigation.component.sass',
    '../../../../shared/styles/spacing.sass'
  ]
})
export class NavigationComponent {
  nav: Nav[] = [
    {
      link: '/',
      name: 'Backlog',
      exact: true,
      icon: IconPaths.APPS_SORT,
      iconAltText: 'Image for the link to the backlog'
    },
  ];
}
