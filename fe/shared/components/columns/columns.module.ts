import {NgModule} from '@angular/core';
import {RowComponent} from './row/row.component';
import {ColumnComponent} from './column/column.component';

@NgModule({
  declarations: [RowComponent, ColumnComponent],
  exports: [RowComponent, ColumnComponent],
})
export class ColumnsModule {}
