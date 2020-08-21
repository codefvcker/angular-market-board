import { CreateListingComponent } from './listing/create-listing/create-listing.component';
import { ListingPageComponent } from './listing/listing-page/listing-page.component';
// import { TrainingComponent } from './shared/playground/training/training.component';
import { SignGuard } from './auth/guards/sign.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { AccountPageComponent } from './account/account-page/account-page.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { SignupPageComponent } from './auth/signup-page/signup-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/components/board/board.component';

import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToListings = () => redirectLoggedInTo(['listings']);

const routes: Routes = [
  { path: '', redirectTo: 'listings', pathMatch: 'full' },
  { path: 'listings', component: BoardComponent },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToListings },
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToListings },
  },
  // { path: 'training', component: TrainingComponent }, //playground
  {
    path: 'account/:id',
    component: AccountPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'listing/create',
    pathMatch: 'full',
    component: CreateListingComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'listing/:id',
    component: ListingPageComponent,
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
