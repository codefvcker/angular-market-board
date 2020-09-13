import { IUser } from './../../shared/interfaces/user.interface';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of, defer, BehaviorSubject, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: BehaviorSubject<IUser> = new BehaviorSubject(
    this.getUserFromLocalStorage()
  );

  constructor(
    private afAuth: AngularFireAuth,
    private af: AngularFirestore,
    private router: Router
  ) {}

  signUp(
    displayName: string,
    email: string,
    password: string
  ): Observable<any> {
    return defer(() => {
      return this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((credentials) => {
          this.addNewUser(displayName, credentials.user);

          this.localStorageSetUtil({ displayName, ...credentials.user });

          this.user$.next({ displayName, ...credentials.user });

          return credentials.user.updateProfile({
            displayName,
          });
        })
        .then((res) => {
          console.log('res', res);
          return of(res);
        });
    });
  }

  logIn(email: string, password: string): Observable<IUser> {
    return defer(() => {
      return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((credentials) => {
          console.log('CREDS', credentials.user);
          let { displayName, uid, email, photoURL } = credentials.user;
          this.localStorageSetUtil({ displayName, uid, email, photoURL });
          this.user$.next({ displayName, uid, email, photoURL });
          return credentials.user;
        });
    });
  }

  signOut() {
    this.localStorageDeleteUtil('userInfo');
    this.user$.next(null);
    this.afAuth.signOut();
  }

  // isAuthorized() {
  //   return this.afAuth.authState;
  // }

  // getCurrentUserInfo() {
  //   return defer(() => this.afAuth.currentUser);
  // }

  getUserFromLocalStorage() {
    return this.localStorageGetUtil('userInfo');
  }

  addNewUser(displayName: string, { uid, email }: IUser) {
    const data = {
      displayName,
      uid,
      email,
    };

    console.log('NEW USER DATA WITH NAME IS ', data);

    this.af.doc(`users/${uid}`).set(data);
  }

  updateUser(updateData: any) {
    // firebase.auth().currentUser.updateProfile(updateData);
    return defer(() => {
      return firebase.auth().currentUser.updateProfile(updateData);
    });
  }

  // Local storage util functions

  localStorageSetUtil(data: any) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  localStorageGetUtil(data: string) {
    return JSON.parse(localStorage.getItem(data));
  }

  localStorageDeleteUtil(data: string) {
    localStorage.removeItem(data);
  }
}
