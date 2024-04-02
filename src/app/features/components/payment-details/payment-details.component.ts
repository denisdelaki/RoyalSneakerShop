import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../pages/Services/cart.service';
import { Console } from 'console';
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: Number = 0;
  cartItemsLength!: number;

  constructor(private route: ActivatedRoute, private cartService: CartService) {}
  ngOnInit(): void {
    this.checkLocalStorage();
    
  //   this.route.queryParams.subscribe(params => {
  //     this.cartItems = params['cartItems'] || [];
  // })
}
 calculateTotalPrice(): void {
  console.log(this.cartItems);

  this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price), 0);
  console.log("Total", this.totalPrice)
}
checkLocalStorage() {
  
  // Fetch cart items from local storage if available
  const storedCartItems = localStorage.getItem('cartItems');
  if (storedCartItems) {
    this.cartItems = JSON.parse(storedCartItems);
    this.calculateTotalPrice();
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
      this.calculateTotalPrice();
    },
    (error: any) => {
      console.error('Error fetching cart items:', error);
    }
  );
}

updateCartItemsLength() {
  if (this.cartItems) {
    this.cartItemsLength = this.cartItems.length;
    console.log(this.cartItemsLength);
  }
}
}
