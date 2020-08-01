import { CommonModule } from '@angular/common';
import { CategoriesService } from './services/categories.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [HeaderComponent, CategoriesComponent],
  exports: [
    HeaderComponent,
    CategoriesComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CategoriesService],
})
export class SharedModule {}
