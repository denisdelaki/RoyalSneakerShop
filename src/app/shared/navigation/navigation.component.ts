import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../pages/Services/cart.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {

  @Output() isSignup: EventEmitter<boolean> = new EventEmitter<boolean>();
  isLoggedIn: boolean = false;
  cartItems: any;
  constructor(private router: Router, private cartService: CartService) {
    // Check if there's a user ID in local storage upon component initialization
    const userId = localStorage.getItem('userId');
    if (userId) {
        // If user ID exists, set isLoggedIn to true
        this.isLoggedIn = true;
    }
    else
    {
      this.isLoggedIn = false;
    }
}
ngOnInit(): void {
  this.fetchCartItems();
}
  fetchCartItems() {
    this.cartService.getCartItems().subscribe(
      (response: any[]) => {
        this.cartItems = response;
        console.log(response);
      },
      (error: any) => {
        console.error('Error fetching cart items:', error);
      }
    );
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
  cart(){
    this.router.navigate(['/cart']);
    console.log("clicked")
  }
}
