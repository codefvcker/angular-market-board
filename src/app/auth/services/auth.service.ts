import { IUser } from './../../shared/interfaces/user.interface';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<any>;
  constructor(
    private afAuth: AngularFireAuth,
    private af: AngularFirestore,
    private router: Router
  ) {}

  async signIn(email, password) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    return this.updateUser(credential.user);
  }

  async updateUser({ uid, email }: IUser) {
    const userRef: AngularFirestoreDocument<IUser> = this.af.doc(
      `users/${uid}`
    );
    const data = {
      uid,
      email,
    };

    userRef.set(data, {
      merge: true,
    });
  }
}
