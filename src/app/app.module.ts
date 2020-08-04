import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BoardModule,
    AuthModule,
    AccountModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
