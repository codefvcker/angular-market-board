import { SignGuard } from './auth/guards/sign.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { AccountPageComponent } from './account/account-page/account-page.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { SignupPageComponent } from './auth/signup-page/signup-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/components/board/board.component';

const routes: Routes = [
  { path: '', redirectTo: 'listings', pathMatch: 'full' },
  { path: 'listings', component: BoardComponent },
  { path: 'login', component: LoginPageComponent, canActivate: [SignGuard] },
  { path: 'signup', component: SignupPageComponent, canActivate: [SignGuard] },
  {
    path: 'account',
    component: AccountPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
