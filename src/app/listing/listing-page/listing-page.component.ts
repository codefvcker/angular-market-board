import { Ilisting } from './../interfaces/listing.interface';
import { FilterService } from './../../board/services/filter.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss'],
})
export class ListingPageComponent implements OnInit {
  public listing$: Ilisting;
  constructor(private route: ActivatedRoute, private filter: FilterService) {}

  ngOnInit(): void {
    // this.route.params.subscribe((data) => console.log('params', data.id));
    this.route.params
      .pipe(switchMap((routeData) => this.filter.getListingById(routeData.id)))
      .subscribe((data: Ilisting) => (this.listing$ = data));
  }
}
