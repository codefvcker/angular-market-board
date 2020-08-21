import { AngularFireAuth } from '@angular/fire/auth';
import { FilterService } from './../../services/filter.service';
import { Subscription } from 'rxjs';
import { Ilisting } from './../../../listing/interfaces/listing.interface';
import { BoardService } from './../../services/board.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params, Router } from '@angular/router';

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
    private router: Router,
    private boardService: BoardService,
    private filter: FilterService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.filter.getListings().subscribe((data) => {
      this.listings$ = data;
    });
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log('user now ', user);
      } else {
        console.log('user not found');
      }
    });
  }

  listingCardClickHandler(listingId: string) {
    this.router.navigate(['listing', listingId]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
