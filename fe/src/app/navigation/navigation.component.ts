import {Component} from '@angular/core';

interface Nav {
  link: string;
  name: string;
  exact: boolean;
}

@Component({
  selector: 'app-navigation',
   template: `
    <nav>
      <a
        *ngFor="let item of nav"
        [routerLink]="item.link"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: item.exact }"
      >
        {{ item.name }}
      </a>
    </nav>
   `
})

export class NavigationComponent {
  nav: Nav[] = [
    {
      link: '/',
      name: 'Backlog',
      exact: true,
    }
  ];
 }
