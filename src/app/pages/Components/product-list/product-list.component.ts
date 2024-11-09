import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { CartService } from '../../Services/cart.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [TruncatePipe]
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];

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
        this.filteredProducts = response;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  handleSearch(searchData: {searchTerm: string, searchBy: string}) {
    if (!searchData.searchTerm) {
      this.filteredProducts = this.products;
      return;
    }

    this.filteredProducts = this.products.filter(product => {
      const searchValue = searchData.searchTerm.toLowerCase();
      switch (searchData.searchBy) {
        case 'name':
          return product.title.toLowerCase().includes(searchValue);
        case 'brand':
          return product.brand.toLowerCase().includes(searchValue);
        case 'price':
          return product.price.toString().includes(searchValue);
        case 'size':
          return product.size.toLowerCase().includes(searchValue);
        default:
          return true;
      }
    });
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
  
