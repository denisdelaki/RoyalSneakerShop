import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../Services/cart.service';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css'
})
export class FeaturedProductsComponent implements OnInit {

  products: any[] = [];
  @Output() productClicked: EventEmitter<number> = new EventEmitter<number>();
  constructor(private productService: ProductsService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe(
      (response: any[]) => {
        this.products = response;
        console.log(response);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    console.log('Added to cart:', product);
    // Update cart items in local storage after adding to cart
    this.updateLocalStorage(product);
  }

  updateLocalStorage(product: any) {
    const storedCartItems = localStorage.getItem('cartItems');
    let cartItems: any[] = [];
    if (storedCartItems) {
      cartItems = JSON.parse(storedCartItems);
    }
    // Add the newly added product to the cart items stored locally
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  increaseQuantity(id: string) {
    // Implement increaseQuantity functionality here
  }

  addToFavorites(id: string) {
    // Implement addToFavorites functionality here
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
