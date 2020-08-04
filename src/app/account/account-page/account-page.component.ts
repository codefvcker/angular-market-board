import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user) => {
      console.log(user);
    });
  }
}
