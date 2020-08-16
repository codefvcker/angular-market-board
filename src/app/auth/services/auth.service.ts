import { IUser } from './../../shared/interfaces/user.interface';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of, defer, BehaviorSubject, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: BehaviorSubject<IUser> = new BehaviorSubject(null);
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
          this.user$.next(credentials.user);
          return credentials.user;
        });
    });
  }

  signOut() {
    this.afAuth.signOut();
  }

  isAuthorized() {
    return this.afAuth.authState;
  }

  // getCurrentUserId() {
  //   return this.user$.pipe(map((userCreds) => userCreds.uid));
  // }

  getCurrentUserInfo() {
    return defer(() => this.afAuth.currentUser);
  }

  addNewUser({ uid, email }: IUser) {
    const data = {
      uid,
      email,
    };

    this.af.doc(`users/${uid}`).set(data);
  }
}
