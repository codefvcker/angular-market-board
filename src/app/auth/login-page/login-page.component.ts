import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  private subscription: Subscription = new Subscription();
  public isSubmited: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  logoutHandler() {
    this.subscription.add(
      this.authService.signOut().subscribe((data) => {
        localStorage.clear();
      })
    );
  }

  submitHandler() {
    const { email, password } = this.loginForm.value;
    this.isSubmited = true;

    if (this.loginForm.valid) {
      this.subscription.add(
        this.authService
          .logIn(email, password)
          .pipe(
            finalize(() => {
              this.loginForm.reset();
              this.isSubmited = false;
            })
          )
          .subscribe(
            (credentials) => {
              localStorage.setItem('userCreds', credentials.email);
              this.router.navigate(['/listings']);
            },
            (error) => {
              console.log('Error while login', error.message);
            }
          )
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
