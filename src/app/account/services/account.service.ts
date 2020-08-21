import { ListingService } from './../../listing/services/listing.service';
import { defer } from 'rxjs';
import { IUser } from './../../shared/interfaces/user.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable()
export class AccountService {
  constructor(
    private af: AngularFirestore,
    private listingService: ListingService
  ) {}

  //   uploadAccountPhoto(filePath: string, photo: File) {
  //     return this.listingService.addSelectedFile(filePath, photo);
  //   }

  updateUserById(uid: string, updateData: IUser) {
    return defer(() => this.af.collection(`users`).doc(uid).update(updateData));
  }
}
