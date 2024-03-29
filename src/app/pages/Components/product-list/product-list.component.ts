import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'] ,
  providers: [TruncatePipe]
})
export class ProductListComponent implements OnInit {
addToCart(_t11: any) {
throw new Error('Method not implemented.');
}
increaseQuantity(_t11: any) {
throw new Error('Method not implemented.');
}
addToFavorites(_t11: any) {
throw new Error('Method not implemented.');
}
  products: any[] = [];

  constructor(private productService: ProductsService,
    private truncatePipe: TruncatePipe) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe(
      (response: any[]) => {
        this.products = response;
        console.log(response)
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
