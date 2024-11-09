import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateProductComponent } from '../../dialogs/create-product/create-product.component';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../../core/Models/Products';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css'
})
export class MyProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: any[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog, 
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  createNewProduct() {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(async (result: Product) => {
      if (result) {
        try {
          console.log("products to be created",result);
          // Add product to Firestore
          await this.firestore.collection('products').add(result);
          // Refresh products list
          this.loadProducts();
        } catch (error) {
          console.error('Error adding product:', error);
        }
      }
    });
  }

  loadProducts() {
    this.firestore.collection('products')
      .valueChanges()
      .subscribe((products: any[]) => {
        this.products = products;
      });
  }
  

  viewProductDetails(productId: number) {
    if (productId) {
      // Set the product ID to local storage
      localStorage.setItem('productId', productId.toString());
      // Navigate to product details page with product ID as route parameter
      this.router.navigate(['/product-detail', productId]);
    }
  }
  
}
