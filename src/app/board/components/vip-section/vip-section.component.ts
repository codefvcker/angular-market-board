import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ilisting } from './../../../listing/interfaces/listing.interface';
import { FilterService } from './../../services/filter.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vip-section',
  templateUrl: './vip-section.component.html',
  styleUrls: ['./vip-section.component.scss'],
})
export class VipSectionComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public vipListings$: Ilisting[];

  // TODO rebase that from filter service and make new injection
  constructor(
    private filter: FilterService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getVipListings();
  }

  getVipListings() {
    this.subscription.add(
      this.filter.getVipListings().subscribe((vipListings: Ilisting[]) => {
        this.vipListings$ = vipListings;
      })
    );
  }

  listingCardClickHandler(listingId: string) {
    this.router.navigate(['/listing', listingId]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
