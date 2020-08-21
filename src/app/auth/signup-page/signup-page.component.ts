import { AlertService } from './../../shared/services/alert.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit, OnDestroy {
  public signinForm: FormGroup;
  private subscriprion: Subscription = new Subscription();

  b: any;

  constructor(
    private af: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.af
      .collection('users', (ref) => ref.where('admin', '==', true))
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.b = doc.data();
        });
      });
  }

  initializeForm() {
    this.signinForm = new FormGroup(
      {
        displayName: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirm: new FormControl('', [Validators.required]),
      },
      this.confirmPasswordValidationHandler
    );
  }

  confirmPasswordValidationHandler(form: FormGroup) {
    return form.get('password').value === form.get('confirm').value
      ? null
      : { mismatch: true };
  }

  submitHandler() {
    if (this.signinForm.valid) {
      this.subscriprion.add(
        this.authService
          .signUp(
            this.signinForm.value.displayName,
            this.signinForm.value.email,
            this.signinForm.value.password
          )
          .subscribe(
            () => {
              this.router.navigate(['/listings']);
            },
            (error) => {
              this.alert.danger(error.message);
            }
          )
      );
      this.signinForm.reset();
    }
  }

  ngOnDestroy() {
    this.subscriprion.unsubscribe();
  }
}
