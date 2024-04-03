import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../pages/Services/cart.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Output() isSignup: EventEmitter<boolean> = new EventEmitter<boolean>();
  isLoggedIn: boolean = false;
  cartItems: any;
  cartItemsLength!: Number;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    // Fetch cart items from local storage if available
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    } else {
      // Fetch cart items from the service if not available in local storage
      this.fetchCartItems();
    }
  }

  fetchCartItems() {
    this.cartService.getCartItems().subscribe(
      (response: any[]) => {
        this.cartItems = response;
        console.log(response);
        this.updateCartItemsLength();
      },
      (error: any) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  updateCartItemsLength() {
    if (this.cartItems) {
      this.cartItemsLength = this.cartItems.length;
    }
  }
  login() {
    this.isSignup.emit(false);
    this.isLoggedIn = true;
  }

  signup() {
    this.isSignup.emit(true);
    this.isLoggedIn = true;
  }

  logout() {
    localStorage.removeItem('userId');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  cart() {
    this.router.navigate(['/cart']);
    console.log("clicked");
  }
  contactus(){
    console.log("contactus");
    this.router.navigate(['/contactus']);
  }
  aboutus()
  {
    this.router.navigate(['/aboutUs']);
  }
  Home(){
    this.router.navigate(['/']);
  }
}
