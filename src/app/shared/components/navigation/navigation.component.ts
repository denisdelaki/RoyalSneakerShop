import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../pages/Services/cart.service';
import { SharedService } from '../../service/shared.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn: boolean = false;
  showLogin: boolean = false;
  cartItems: any;
  cartItemsLength!: Number;

  constructor(private router: Router, 
    private shared: SharedService,
    private cartService: CartService) {}

  ngOnInit(): void {
    this.checkLocalStorage();
    this.shared.currentLoginState.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  checkLocalStorage() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.isLoggedIn = true;
      // Update the shared service state to match localStorage
      this.shared.updateLoginState(true);
    } else {
      this.isLoggedIn = false;
      this.shared.updateLoginState(false);
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
    this.shared.changeSignupState(false)
    this.router.navigate(['/auth/']);
    // this.isLoggedIn = true;
  }

  signup() {
    this.shared.changeSignupState(true)
    this.router.navigate(['/auth']);
  }

  logout() {
    localStorage.removeItem('userId');
    this.shared.updateLoginState(false);
    this.router.navigate(['/']);
  }

    productList() {
      this.router.navigate(['/product-list']);
    }
    myAccount() {
      this.router.navigate(['/features/myprofile']);
    }

  cart() {
    this.router.navigate(['/cart']);
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
  catalog(){
    this.router.navigate(['/catalog']);
  }
}
