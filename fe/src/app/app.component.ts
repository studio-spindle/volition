import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.sass'],
  template: `
    <div class="app">
      <router-outlet></router-outlet>
    </div>
  `,
})

export class AppComponent {}
