import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-inline',
  templateUrl: './inline.component.html',
  styleUrls: ['./inline.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
