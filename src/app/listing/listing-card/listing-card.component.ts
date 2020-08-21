import { Ilisting } from './../interfaces/listing.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.scss'],
})
export class ListingCardComponent implements OnInit {
  @Input() public listing: Ilisting;

  constructor() {}

  ngOnInit(): void {
    // console.log('this listing', this.listing);
  }
}
