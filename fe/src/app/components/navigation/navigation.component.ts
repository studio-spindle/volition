import {Component} from '@angular/core';

interface Nav {
  link: string;
  name: string;
  exact: boolean;
}

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.sass']
})
export class NavigationComponent {
  nav: Nav[] = [
    {
      link: '/',
      name: 'Backlog',
      exact: true,
    },
    {
      link: '/dashboard',
      name: '<Username>',
      exact: true,
    },
  ];
}
