import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private firestore: AngularFirestore) { }

  addToCart(product: any) {
    return this.firestore.collection('cart').add(product);
  }

  getCartItems(): Observable<any[]> {
    return this.firestore.collection('cart').valueChanges();
  }
  updateCartItems(cartItems: any[]): Observable<void> { // Adjust return type
    const batch = this.firestore.firestore.batch();
    const cartCollection = this.firestore.collection('cart');

    cartItems.forEach(item => {
      const docRef = cartCollection.doc(item.id).ref;
      batch.set(docRef, item);
    });

    return new Observable<void>(observer => {
      batch.commit().then(() => {
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  removeCartItem(itemId: string): Observable<void> {
    const docRef = this.firestore.collection('cart').doc(itemId).ref;

    return new Observable<void>(observer => {
      docRef.delete().then(() => {
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }
}
