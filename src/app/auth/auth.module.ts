import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';

@NgModule({
  declarations: [LoginPageComponent, SigninPageComponent],
  imports: [CommonModule, AppRoutingModule, SharedModule],
})
export class AuthModule {}
