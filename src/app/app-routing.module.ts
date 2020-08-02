import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { SigninPageComponent } from './auth/signin-page/signin-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/components/board/board.component';

const routes: Routes = [
  { path: '', redirectTo: 'listings', pathMatch: 'full' },
  { path: 'listings', component: BoardComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signin', component: SigninPageComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
