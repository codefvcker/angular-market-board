import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateListingComponent } from './create-listing/create-listing.component';
import { ListingPageComponent } from './listing-page/listing-page.component';
import { ListingCardComponent } from './listing-card/listing-card.component';
import { ListingService } from './services/listing.service';

@NgModule({
  declarations: [
    CreateListingComponent,
    ListingPageComponent,
    ListingCardComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  exports: [ListingCardComponent],
  providers: [ListingService],
})
export class ListingModule {}
