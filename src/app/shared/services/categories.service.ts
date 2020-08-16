import { FilterService } from './../../board/services/filter.service';
import { Category } from './../interfaces/category.interface';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    {
      name: 'sport',
      id: 'sport01',
    },
    {
      name: 'clothes',
      id: 'clothes01',
    },
    {
      name: 'for male',
      id: 'male01',
    },
    {
      name: 'for female',
      id: 'female01',
    },
    {
      name: 'electronics',
      id: 'electro01',
    },
  ];

  constructor(private filter: FilterService) {}

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  getListingsByCategoryId(categoryId: string) {
    this.filter.categoryFilter$.next(categoryId);
  }
}
