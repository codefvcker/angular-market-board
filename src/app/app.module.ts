import { AlertInterceptor } from './shared/interceptors/alert.interceptor';
import { ListingModule } from './listing/listing.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

const ALERT_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: AlertInterceptor,
  multi: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BoardModule,
    AuthModule,
    AccountModule,
    ListingModule,
    HttpClientModule,
  ],
  providers: [ALERT_INTERCEPTOR],
  bootstrap: [AppComponent],
})
export class AppModule {}
