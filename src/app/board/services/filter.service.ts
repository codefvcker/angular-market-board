import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { combineLatest, BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

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
  public titleFilter$: BehaviorSubject<string | null> = new BehaviorSubject(
    null
  );

  constructor(private af: AngularFirestore) {
    this.listings$ = combineLatest(
      this.categoryFilter$,
      this.fromPriceFilter$,
      this.toPriceFilter$,
      this.stateFilter$,
      this.cityFilter$,
      this.titleFilter$
    ).pipe(
      switchMap(
        ([categoryId, fromPrice, toPrice, goodsState, cityId, listingTitle]) =>
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
              if (listingTitle) {
                query = query.startAt(listingTitle);
              }

              return query;
            })
            .snapshotChanges()
            .pipe(
              map((listings: any) => {
                const newListings = listings.map((doc) => {
                  let data = doc.payload.doc.data();
                  let id = doc.payload.doc.id;
                  return { id, ...data };
                });
                return newListings;
              })
            )
      )
    );
  }

  getListings() {
    return this.listings$;
  }

  // TODO rebase that from filter service to other for example listings service
  getVipListings() {
    return this.af
      .collection('listings', (ref) => ref.where('isVip', '==', true).limit(3))
      .valueChanges();
  }

  // Todo rebase this too
  getListingById(listingId: string) {
    return this.af.collection('listings').doc(listingId).valueChanges();
  }

  // getFilteredListingsFromSearch(value: string) {
  //   this.af.instance.collection('listings').
  // }
}
