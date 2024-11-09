import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchForm: FormGroup;
  @Output() searchEvent = new EventEmitter<{searchTerm: string, searchBy: string}>();

  searchOptions = [
    { value: 'name', viewValue: 'Product Name' },
    { value: 'size', viewValue: 'Size' },
    { value: 'brand', viewValue: 'Brand' },
    { value: 'price', viewValue: 'Price' }
  ];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: [''],
      searchBy: ['name']
    });

    this.searchForm.valueChanges.subscribe(value => {
      this.searchEvent.emit({
        searchTerm: value.searchTerm,
        searchBy: value.searchBy
      });
    });
  }

  onSearch() {
    const { searchTerm, searchBy } = this.searchForm.value;
    this.searchEvent.emit({ searchTerm, searchBy });
  }

  clearSearch() {
    this.searchForm.reset({
      searchTerm: '',
      searchBy: 'name'
    });
  }
}