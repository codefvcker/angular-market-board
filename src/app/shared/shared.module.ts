import { AppRoutingModule } from './../app-routing.module';
import { CommonModule } from '@angular/common';
import { CategoriesService } from './services/categories.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories/categories.component';
import { ErrorPageComponent } from './error-page/error-page.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from './../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  declarations: [HeaderComponent, CategoriesComponent, ErrorPageComponent],
  exports: [
    HeaderComponent,
    CategoriesComponent,
    ErrorPageComponent,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
  ],
  providers: [CategoriesService],
})
export class SharedModule {}
