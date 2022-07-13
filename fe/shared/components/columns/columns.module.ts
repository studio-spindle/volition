import {NgModule} from '@angular/core';
import {ColumnsComponent} from './columns/columns.component';
import {ColumnComponent} from './column/column.component';

@NgModule({
  declarations: [ColumnsComponent, ColumnComponent],
  exports: [ColumnsComponent, ColumnComponent],
})
export class ColumnsModule {}
