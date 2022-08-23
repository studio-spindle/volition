import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
