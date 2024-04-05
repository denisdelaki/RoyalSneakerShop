import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any = null; 

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the product ID from the route parameters
    this.route.params.subscribe(params => {
      const productId = +params['id']; // Convert the parameter to a number
      if (productId) {
        // Call the method to fetch product details
        this.getProductDetails(productId);
      }
    });
  }

  getProductDetails(productId: number): void {
    // Call the ProductService method to fetch product details by ID
    this.productService.getProductById(productId).subscribe(
      (product: any) => {
        this.product = product; // Assign fetched product details to the variable
      },
      (error) => {
        console.error('Error fetching product details:', error);
        // Handle errors
      }
    );
  }

  ngOnDestroy(): void {
    // Clear the product ID from local storage
    localStorage.removeItem('productId');
  }
}
