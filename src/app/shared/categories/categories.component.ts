import { Category } from './../interfaces/category.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public categories: Category[] = [];
  public subscription: Subscription = new Subscription();

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  getCategories() {
    this.subscription.add(
      this.categoriesService
        .getCategories()
        .subscribe((categories: Category[]) => {
          this.categories = categories;
        })
    );
  }

  chooseCategoryHandler(id: string) {
    this.router.navigate([''], {
      queryParams: {
        cat: id,
      },
    });
    this.categoriesService.getListingsByCategoryId(id);
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
