
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [TruncatePipe]
})
export class CartComponent implements OnInit {
  @ViewChild('quantityInput') quantityInput!: ElementRef;
  cartItems: any[] = [];
  itemToDelete: any;
 openModal: boolean = false;
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCart();
  }

  fetchCart() {
    this.cartService.getCartItems().subscribe(
      (response: any[]) => {
        this.cartItems = response;
        console.log(response);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  proceedToPay() {
    this.router.navigate(['features/payment']);
  }
  
  getItemQuantity(item: any): number {
    return item.quantity || 1;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartItem(item);
    }
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.updateCartItem(item);
  }
  calculateTotalPrice(item: any): number {
    return item.price * (item.quantity || 1);
  }
  updateQuantity(item: any, event: any) {
    const newQuantity = event.target.value;
    const quantity = parseInt(newQuantity, 10);
    if (!isNaN(quantity) && quantity >= 0) {
      item.quantity = quantity;
      this.updateCartItem(item);
    }
  }

  removeItem(item: any) {
    // Store the item to delete
    this.itemToDelete = item;

    // Trigger the modal
    this.openModal=!this.openModal;
    // const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    // confirmationModal.show();
  }

  confirmDelete() {
    console.log('confirmDelete')
    // Remove the item from cartItems array
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== this.itemToDelete.id);

    // Update local storage
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

    // Update cart items in the service
    this.cartService.updateCartItems(this.cartItems).subscribe(
      () => {
        console.log('Item removed from cart:', this.itemToDelete);
      },
      (error: any) => {
        console.error('Error removing item from cart:', error);
      }
    );

    // Clear the itemToDelete variable
    this.itemToDelete = null;
  }

  updateCartItem(item: any) {
    // Update cart items in the service
    this.cartService.updateCartItems(this.cartItems).subscribe(
      () => {
        console.log('Cart item updated:', item);
        this.saveCartItemsToLocalStorage();
      },
      (error: any) => {
        console.error('Error updating cart item:', error);
      }
    );
  }
  saveCartItemsToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  
  sortByPrice_lowest_First() {
    this.cartItems.sort((a, b) => {
      return a.price - b.price; 
    });
  }
  sortByPrice_highest_First() {
    this.cartItems.sort((a, b) => {
      return b.price - a.price; 
    });
  }
}
