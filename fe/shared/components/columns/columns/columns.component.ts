import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
