import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public filterForm: FormGroup;

  constructor() {}

  initializeForm() {
    this.filterForm = new FormGroup({
      city: new FormControl(null),
      price: new FormGroup({
        from: new FormControl(null),
        to: new FormControl(null),
      }),
      state: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }
}
