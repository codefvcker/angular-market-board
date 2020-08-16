import { Ilisting } from './../../listing/interfaces/listing.interface';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable()
export class BoardService {
  constructor(private af: AngularFirestore) {}

  getAllListings(): Observable<Ilisting[]> {
    return this.af
      .collection<Ilisting>('listings', (ref) => ref.limit(20))
      .valueChanges();
  }
}
