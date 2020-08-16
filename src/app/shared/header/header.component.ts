import { AlertService } from './../services/alert.service';
import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  form: FormGroup;
  isLogged: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl(null),
    });
    this.isLoggedChecker()
  }

  isLoggedChecker() {
    this.auth.isAuthorized().subscribe(data =>this.isLogged = !!data)
    console.log(this.isLogged)
  }

  logout() {
    this.auth.signOut()
  }

  searchHandler() {
    console.log(this.form.value.search);
    this.form.reset();
  }
}
