import { Component, OnInit } from '@angular/core';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { CartService } from '../Services/cart.service';
import { ProductsService } from '../Services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.css'],
  providers: [TruncatePipe]
})
export class ElectronicsComponent implements OnInit {

  products: any[] = [];
  category: string = '';

  constructor(private productService: ProductsService,
              private cartService: CartService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.fetchProducts();
    });
  }

  fetchProducts() {
    console.log("category",this.category);
    switch (this.category) {
      case 'electronics':
        this.productService.getElectronicProducts().subscribe(
          (response: any[]) => {
            this.products = response;
            console.log(response);
          },
          (error) => {
            console.error('Error fetching electronic products:', error);
          }
        );
        break;
      case 'jewelry':
        this.productService.getjeweleryProducts().subscribe(
          (response: any[]) => {
            this.products = response;
            console.log(response);
          },
          (error) => {
            console.error('Error fetching jewelry products:', error);
          }
        );
        break;
      case 'mensclothing':
        this.productService.getmensProducts().subscribe(
          (response: any[]) => {
            this.products = response;
            console.log(response);
          },
          (error) => {
            console.error('Error fetching men\'s clothing products:', error);
          }
        );
        break;
      case 'womensclothing':
        this.productService.getwomensProducts().subscribe(
          (response: any[]) => {
            this.products = response;
            console.log(response);
          },
          (error) => {
            console.error('Error fetching women\'s clothing products:', error);
          }
        );
        break;
      default:
        // default case

        this.productService.getProducts().subscribe(
          (response: any[]) => {
            this.products = response;
            console.log(response);
          },
          (error) => {
            console.error('Error fetching women\'s clothing products:', error);
          }
        );
        break;
    }
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
}