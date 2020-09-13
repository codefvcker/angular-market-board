import { AccountService } from './../services/account.service';
import { AlertService } from './../../shared/services/alert.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ListingService } from './../../listing/services/listing.service';
import { Ilisting } from './../../listing/interfaces/listing.interface';
import { AuthService } from './../../auth/services/auth.service';
import { IUser } from './../../shared/interfaces/user.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  public isEditing: boolean = false;
  public currentUser: IUser;
  public userListings: Ilisting[] = [];
  public userEditedName: string = 'ccvc';

  constructor(
    private auth: AuthService,
    private listingService: ListingService,
    private accountService: AccountService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.getUserListings();
  }

  getCurrentUser() {
    this.subscription.add(
      this.auth.user$
        .pipe(
          tap((user) => {
            if (!user) this.router.navigate(['listings']);
          })
        )
        .subscribe((user) => {
          this.currentUser = user;
          console.log(user);
        })
    );
  }

  getUserListings() {
    this.listingService
      .getListingsByUserId(this.currentUser.uid)
      .subscribe((listingsList: Ilisting[]) => {
        console.log(listingsList);
        this.userListings = listingsList;
      });
  }

  editingModeToggle() {
    const updateData = {
      displayName: this.userEditedName,
      email: this.currentUser.email,
    };

    console.log('UPPPPP', updateData);

    this.isEditing = !this.isEditing;

    if (!this.isEditing) {
      this.accountService
        .updateUserById(this.currentUser.uid, updateData)
        .subscribe((data) => {
          this.alert.success('User data was updated');
        });
    }
  }

  onPhotoUploaded(e) {
    const date = Date.now();
    const filePath = `UsersPhotos/${date}`;

    this.accountService.addSelectedFile(filePath, e.target.files[0]).subscribe(
      (data) => {
        this.alert.success('Photo uploaded');
        console.log('data from subscr', data);
      },
      (err) => {
        this.alert.danger(`Something went wrong. Error is: ${err.message}`);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
