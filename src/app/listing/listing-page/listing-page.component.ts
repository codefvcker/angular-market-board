import { Ilisting } from './../interfaces/listing.interface';
import { FilterService } from './../../board/services/filter.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

declare let $: any;

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss'],
})
export class ListingPageComponent implements OnInit {
  public listing: Ilisting;
  constructor(private route: ActivatedRoute, private filter: FilterService) {}

  ngOnInit(): void {
    // this.route.params.subscribe((data) => console.log('params', data.id));
    this.route.params
      .pipe(switchMap((routeData) => this.filter.getListingById(routeData.id)))
      .subscribe((data: Ilisting) => {
        console.log('photos urls', data.photosUrls);
        this.listing = data;
      });
  }

  carouselSwipe(direction: string) {
    direction === 'next'
      ? $('.carousel').carousel('next')
      : $('.carousel').carousel('prev');
  }
}
