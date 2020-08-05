import { TrainingGeoService } from './playground/services/training-geo.service';
import { AlertService } from './services/alert.service';
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
import { AlertComponent } from './alert/alert.component';
import { TrainingComponent } from './playground/training/training.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  declarations: [
    HeaderComponent,
    CategoriesComponent,
    ErrorPageComponent,
    AlertComponent,
    TrainingComponent,
  ],
  exports: [
    HeaderComponent,
    CategoriesComponent,
    ErrorPageComponent,
    AlertComponent,
    TrainingComponent,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
  ],
  providers: [CategoriesService, AlertService, TrainingGeoService],
})
export class SharedModule {}
