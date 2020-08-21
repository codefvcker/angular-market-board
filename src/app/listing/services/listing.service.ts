import { Ilisting } from '../interfaces/listing.interface';
import { AuthService } from '../../auth/services/auth.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { defer, Observable } from 'rxjs';

@Injectable()
export class ListingService {
  private selectedUrls: string[] = [];

  constructor(
    private storage: AngularFireStorage,
    private af: AngularFirestore,
    private auth: AuthService
  ) {}

  getAllListings(): Observable<Ilisting[]> {
    return this.af
      .collection<Ilisting>('listings', (ref) => ref.limit(20))
      .valueChanges();
  }

  getListingById() {}

  getListingsByUserId(uid: string) {
    return this.af
      .collection('listings', (ref) => ref.where('authorId', '==', uid))
      .valueChanges();
  }

  createListing(listing: Ilisting) {
    let listingBody: Ilisting = { ...listing, photosUrls: this.selectedUrls };

    this.selectedUrls = [];

    return defer(() => {
      return this.af
        .collection('listings')
        .add(listingBody)
        .then((docRef) => docRef.id)
        .catch((e) => e);
    });
  }

  // Rebase method into the shared module
  addSelectedFile(filePath, file) {
    const storagePlace = this.storage.upload(filePath, file);
    const fileRef = this.storage.ref(filePath);

    return storagePlace.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          if (url) {
            this.selectedUrls.push(url);
          }
        });
      })
    );
  }
}
