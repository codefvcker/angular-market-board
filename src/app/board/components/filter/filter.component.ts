import { Ilisting } from './../../../listing/interfaces/listing.interface';
import { FilterService } from './../../services/filter.service';
import { FormGroup, FormControl } from '@angular/forms';
import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  AfterContentChecked,
  AfterViewChecked,
} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public filterForm: FormGroup;

  // public listings$: Ilisting[];

  constructor(private filter: FilterService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.filterForm.valueChanges.subscribe((value) => {
      let { city, category, from, to, state } = value;

      if (state !== 'new' && state !== 'used') state = null;

      this.filter.stateFilter$.next(state);
      this.filter.cityFilter$.next(city);
      this.filter.categoryFilter$.next(category);
      this.filter.fromPriceFilter$.next(from);
      this.filter.toPriceFilter$.next(to);
    });
  }

  initializeForm() {
    this.filterForm = new FormGroup({
      city: new FormControl(null),
      category: new FormControl(null),
      from: new FormControl(null),
      to: new FormControl(null),
      state: new FormControl(null),
    });
  }

  resetFilter() {
    this.filterForm.reset();
  }
}
