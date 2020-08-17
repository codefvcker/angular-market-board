import { Subscription } from 'rxjs';
import { Ilisting } from './../../../listing/interfaces/listing.interface';
import { FilterService } from './../../services/filter.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-vip-section',
  templateUrl: './vip-section.component.html',
  styleUrls: ['./vip-section.component.scss'],
})
export class VipSectionComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public vipListings$: Ilisting[];

  // TODO rebase that from filter service and make new injection
  constructor(private filter: FilterService) {}

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
