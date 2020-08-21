import { AccountService } from './services/account.service';
import { ListingModule } from './../listing/listing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPageComponent } from './account-page/account-page.component';

@NgModule({
  declarations: [AccountPageComponent],
  imports: [CommonModule, ListingModule],
  providers: [AccountService],
})
export class AccountModule {}
