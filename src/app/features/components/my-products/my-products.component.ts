import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css'
})
export class MyProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    
  }

  createNewProduct() {
    this.router.navigate(['/create-product']);
  }

  viewProductDetails(productId: number) {
    if (productId) {
      // Set the product ID to local storage
      localStorage.setItem('productId', productId.toString());
      // Navigate to product details page with product ID as route parameter
      this.router.navigate(['/product-detail', productId]);
    }
  }
  
}
