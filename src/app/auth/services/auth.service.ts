import { IUser } from './../../shared/interfaces/user.interface';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of, defer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<any>;
  constructor(
    private afAuth: AngularFireAuth,
    private af: AngularFirestore,
    private router: Router
  ) {}

  signUp(email: string, password: string): Observable<IUser> {
    return defer(() => {
      return this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((credentials) => {
          this.addNewUser(credentials.user);
          return credentials.user;
        });
    });
  }

  logIn(email: string, password: string): Observable<IUser> {
    return defer(() => {
      return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((credentials) => {
          return credentials.user;
        });
    });
  }

  signOut() {
    return defer(() => {
      return this.afAuth.signOut();
    });
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('userCreds') ? true : false;
  }

  addNewUser({ uid, email }: IUser) {
    const data = {
      uid,
      email,
    };

    this.af.doc(`users/${uid}`).set(data);
  }
}
