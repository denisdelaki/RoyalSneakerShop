import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../pages/Services/cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: Number = 0;
  cartItemsLength!: number;
  selectedPaymentMethod: string = '';
  mobileNumber: string = '';

  constructor(private route: ActivatedRoute, private cartService: CartService, private http: HttpClient, private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  onPaymentMethodChange(event: any) {
    this.selectedPaymentMethod = event.target.value;
    // Hide the mobile number input field if payment method is not M-Pesa
    if (this.selectedPaymentMethod !== 'mpesa') {
      this.mobileNumber = ''; // Reset mobile number field
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  checkLocalStorage() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.calculateTotalPrice();
    } else {
      this.fetchCartItems();
    }
  }

  fetchCartItems() {
    this.cartService.getCartItems().subscribe(
      (response: any[]) => {
        this.cartItems = response;
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
    }
  }

  placeOrder() {
    // Construct the request payload
    const payload = {
      mobileNumber: this.mobileNumber,
      amount: this.totalPrice
    };

    // Call the service method to initiate STK push
    this.paymentService.initiateSTKPush(payload.mobileNumber, payload.amount)
      .subscribe(
        (response: { success: boolean, message: string }) => {
          // Handle successful response (e.g., display success message to user)
          console.log('STK Push initiated successfully:', response);
          alert('Order placed successfully!');
        },
        (error: any) => {
          // Handle error response (e.g., display error message to user)
          console.error('Error placing order:', error);
          alert('Error placing order. Please try again later.');
        }
      );
  }
}