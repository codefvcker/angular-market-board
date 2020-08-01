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

  constructor() {}

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  getListingsByCategoryId(id: string) {
    console.log('Category id: ', id);
  }
}
