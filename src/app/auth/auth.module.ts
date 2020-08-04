import { SignGuard } from './guards/sign.guard';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [LoginPageComponent, SignupPageComponent],
  imports: [CommonModule, AppRoutingModule, SharedModule],
  providers: [AuthService, AuthGuard, SignGuard],
})
export class AuthModule {}
