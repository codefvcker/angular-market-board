import { IUser } from './../../shared/interfaces/user.interface';
import { Router } from '@angular/router';
import { Ilisting } from './../interfaces/listing.interface';
import { AuthService } from './../../auth/services/auth.service';
import { AlertService } from './../../shared/services/alert.service';
import { ListingService } from './../services/listing.service';
import {
  finalize,
  switchMap,
  mergeMap,
  concatMap,
  tap,
  map,
} from 'rxjs/operators';
import { Observable, of, defer } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.scss'],
})
export class CreateListingComponent implements OnInit {
  public createListingForm: FormGroup;
  private currentUserId: string;

  selectedFiles: File[] = [];
  downloadUrl: Observable<string>;

  constructor(
    private listingService: ListingService,
    private alert: AlertService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.auth.user$.subscribe((userData: IUser) => {
      this.currentUserId = userData.uid;
    });
  }

  initializeForm() {
    this.createListingForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      state: new FormControl(null, [Validators.required]),
      photos: new FormControl(null),
    });
  }

  createHandler() {
    let listingBody: Ilisting = {
      authorId: this.currentUserId,
      cityId: this.createListingForm.value.city,
      categoryId: this.createListingForm.value.category,
      state: this.createListingForm.value.state,
      title: this.createListingForm.value.title,
      price: this.createListingForm.value.price,
      description: this.createListingForm.value.description,
    };

    this.listingService.createListing(listingBody).subscribe(
      () => {
        this.router.navigate(['/listings']);
        this.alert.success('Listing created successfully');
      },
      (e) => {
        this.alert.danger('Listing didnt create.' + e.message);
      }
    );

    this.createListingForm.reset();
  }

  onFileSelected(e) {
    const date = Date.now();
    const filePath = `ListingImages/users/${date}`;

    this.listingService.addSelectedFile(filePath, e.target.files[0]).subscribe(
      (data) => {
        this.alert.success('Image is uploaded');
      },
      (e) => {
        this.alert.danger(`Something went wrong. Image didn't upload`);
      }
    );
  }
}
