import { FilterService } from './services/filter.service';
import { BoardService } from './services/board.service';
import { ListingModule } from './../listing/listing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { FilterComponent } from './components/filter/filter.component';
import { VipSectionComponent } from './components/vip-section/vip-section.component';

@NgModule({
  declarations: [BoardComponent, FilterComponent, VipSectionComponent],
  imports: [CommonModule, SharedModule, ListingModule],
  exports: [BoardComponent],
  providers: [BoardService, FilterService],
})
export class BoardModule {}
