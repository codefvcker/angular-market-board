import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmValidationUtil } from '../utils/confirm-password.util';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { from, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss'],
})
export class SigninPageComponent implements OnInit {
  public signinForm: FormGroup;
  public x$: Observable<any>;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.initializeForm();
    this.x$ = this.db.list('test').valueChanges();
    console.log(this.x$);
  }

  initializeForm() {
    this.signinForm = new FormGroup(
      {
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
      console.log(this.signinForm.value);
      // this.db.list('test').push(this.signinForm.value);
      this.db.list('test').push(this.signinForm.value.email);
      this.signinForm.reset();
    }
  }
}
