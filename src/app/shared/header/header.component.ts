import { FilterService } from './../../board/services/filter.service';
import { AlertService } from './../services/alert.service';
import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounce, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;
  isLogged: boolean = false;

  constructor(private auth: AuthService, private filter: FilterService) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null),
    });
    this.isLoggedChecker();

    this.searchForm
      .get('search')
      .valueChanges.pipe(
        debounceTime(800)
        // switchMap(value => this.filter.titleFilter$.next(value))
      )
      .subscribe((value) => this.filter.titleFilter$.next(value));
  }

  isLoggedChecker() {
    this.auth.isAuthorized().subscribe((data) => (this.isLogged = !!data));
    console.log(this.isLogged);
  }

  logout() {
    this.auth.signOut();
  }

  searchHandler() {
    console.log(this.searchForm.value.search);
    this.searchForm.reset();
  }
}
