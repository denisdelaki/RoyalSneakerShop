import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  productsData = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    // Add more product data as needed
  ];

  // Table data source
  // dataSource = new MatTableDataSource<any>(this.productsData);

  // Paginator reference
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  // Initialize paginator after view initialization
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
}
