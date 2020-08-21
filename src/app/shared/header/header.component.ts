import { IUser } from './../interfaces/user.interface';
import { FilterService } from './../../board/services/filter.service';
import { AlertService } from './../services/alert.service';
import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounce, debounceTime, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  searchForm: FormGroup;
  isLogged: boolean = false;
  currentUser: IUser;

  constructor(private auth: AuthService, private filter: FilterService) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null),
    });
    this.isLoggedChecker();

    this.subscription.add(
      this.searchForm
        .get('search')
        .valueChanges.pipe(
          debounceTime(800)
          // switchMap(value => this.filter.titleFilter$.next(value))
        )
        .subscribe((value) => this.filter.titleFilter$.next(value))
    );

    this.getCurrentUser();
  }

  isLoggedChecker() {
    this.subscription.add(
      this.auth.user$.subscribe((data) => {
        console.log('isLogged data', data);
        console.log('isLogged just - ', this.isLogged);
        this.isLogged = !!data;
        console.log('isLogged after - ', this.isLogged);
      })
    );
  }

  getCurrentUser() {
    this.subscription.add(
      this.auth.user$.subscribe((user) => {
        this.currentUser = user;
      })
    );
  }

  logout() {
    this.auth.signOut();
  }

  searchHandler() {
    this.searchForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
