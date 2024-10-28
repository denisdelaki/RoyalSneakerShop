import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../pages/Services/cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaymentService } from '../../../features/services/payment.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  paymentForm!: FormGroup;


  constructor(private route: ActivatedRoute, 
    private cartService: CartService, 
    private http: HttpClient, 
    private paymentService: PaymentService,
    private fb: FormBuilder

  ) {
    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      mobileNumber: ['', [
        Validators.pattern('^[0-9]{10}$'),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      totalPrice: [{value: '', disabled: true}]
    });
  }

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  // onPaymentMethodChange(event: any) {
  //   this.selectedPaymentMethod = event.target.value;
  //   // Hide the mobile number input field if payment method is not M-Pesa
  //   if (this.selectedPaymentMethod !== 'mpesa') {
  //     this.mobileNumber = ''; // Reset mobile number field
  //   }
  // }

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

  onPaymentMethodChange(event: any) {
    const paymentMethod = event.target.value;
    this.paymentForm.patchValue({ paymentMethod });
    
    if (paymentMethod === 'mpesa') {
      this.paymentForm.get('mobileNumber')?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]);
    } else {
      this.paymentForm.get('mobileNumber')?.clearValidators();
    }
    this.paymentForm.get('mobileNumber')?.updateValueAndValidity();
  }

  placeOrder() {
    if (this.paymentForm.valid) {
      const payload = {
        mobileNumber: this.paymentForm.get('mobileNumber')?.value,
        amount: this.totalPrice
      };
      
      this.paymentService.initiateSTKPush(payload.mobileNumber, payload.amount)
        .subscribe(
          (response: { success: boolean, message: string }) => {
            console.log('STK Push initiated successfully:', response);
            alert('Order placed successfully!');
          },
          (error: any) => {
            console.error('Error placing order:', error);
            alert('Error placing order. Please try again later.');
          }
        );
    }
  }
}
