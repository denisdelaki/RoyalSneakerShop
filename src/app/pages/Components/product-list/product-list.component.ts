import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { CartService } from '../../Services/cart.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [TruncatePipe]
})
export class ProductListComponent implements OnInit {

  products: any[] = [];

  constructor(private productService: ProductsService,
              private cartService: CartService,
              private truncatePipe: TruncatePipe) { }

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
  }

  increaseQuantity(id: string) {
    // Implement increaseQuantity functionality here
  }

  addToFavorites(id: string) {
    // Implement addToFavorites functionality here
  }
}
