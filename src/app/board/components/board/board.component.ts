import { FilterService } from './../../services/filter.service';
import { Subscription } from 'rxjs';
import { Ilisting } from './../../../listing/interfaces/listing.interface';
import { BoardService } from './../../services/board.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public qP: Params;
  public listings: Ilisting[] = null;

  public listings$: Ilisting[];

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private filter: FilterService
  ) {}

  ngOnInit(): void {
    this.filter.getListings().subscribe((data) => {
      this.listings$ = data;
      console.log('filtred data', data);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
