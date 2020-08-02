import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [BoardComponent, FilterComponent],
  imports: [CommonModule, SharedModule],
  exports: [BoardComponent],
})
export class BoardModule {}
