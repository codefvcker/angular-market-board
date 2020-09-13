import { AuthService } from './../../auth/services/auth.service';
import { finalize } from 'rxjs/operators';
import { ListingService } from './../../listing/services/listing.service';
import { defer } from 'rxjs';
import { IUser } from './../../shared/interfaces/user.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable()
export class AccountService {
  public uploadedPhotoUrl: string = '';

  constructor(
    private af: AngularFirestore,
    private listingService: ListingService,
    private storage: AngularFireStorage,
    private auth: AuthService
  ) {}

  //   uploadAccountPhoto(filePath: string, photo: File) {
  //     return this.listingService.addSelectedFile(filePath, photo);
  //   }

  addSelectedFile(filePath, file) {
    const storagePlace = this.storage.upload(filePath, file);
    const fileRef = this.storage.ref(filePath);

    return storagePlace.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          if (url) {
            this.uploadedPhotoUrl = url;
          }
        });
      })
    );
  }

  updateUserById(uid: string, updateData: IUser) {
    let body = {
      ...updateData,
      photoURL: this.uploadedPhotoUrl,
    };

    // return defer(() => this.af.collection(`users`).doc(uid).update(body));
    return this.auth.updateUser(body);
  }
}
