
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  itemToDelete: any;
 openModal: boolean = false;
  constructor(private cartService: CartService) {}

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
      },
      (error: any) => {
        console.error('Error updating cart item:', error);
      }
    );
  }
}
