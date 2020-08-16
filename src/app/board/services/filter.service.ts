import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { combineLatest, BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class FilterService {
  public listings$: Observable<any>;

  public stateFilter$: BehaviorSubject<number | null> = new BehaviorSubject(0);
  public cityFilter$: BehaviorSubject<number | null> = new BehaviorSubject(0);
  public categoryFilter$: BehaviorSubject<string | null> = new BehaviorSubject(
    null
  );
  public fromPriceFilter$: BehaviorSubject<number | null> = new BehaviorSubject(
    0
  );
  public toPriceFilter$: BehaviorSubject<number | null> = new BehaviorSubject(
    0
  );

  constructor(private af: AngularFirestore) {
    this.listings$ = combineLatest(
      this.categoryFilter$,
      this.fromPriceFilter$,
      this.toPriceFilter$,
      this.stateFilter$,
      this.cityFilter$
    ).pipe(
      switchMap(([categoryId, fromPrice, toPrice, goodsState, cityId]) =>
        this.af
          .collection('listings', (ref) => {
            let query:
              | firebase.firestore.CollectionReference
              | firebase.firestore.Query = ref;

            if (categoryId) {
              query = query.where('categoryId', '==', categoryId);
            }
            if (fromPrice) {
              query = query.where('price', '>', fromPrice);
            }
            if (toPrice) {
              query = query.where('price', '<', toPrice);
            }
            if (goodsState) {
              query = query.where('isNew', '==', goodsState);
            }
            if (cityId) {
              query = query.where('cityId', '==', cityId);
            }

            return query;
          })
          .valueChanges()
      )
    );
  }

  getListings() {
    return this.listings$;
  }
}
