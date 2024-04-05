import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any = {}; 
  products: any[] = [];
  category: string="";
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    // Get the product ID from the route parameters
    this.route.params.subscribe(params => {
       // Convert the parameter to a number
      const productId = +params['id'];
      if (productId) {
        // Call the method to fetch product details
        this.getProductDetails(productId);
      }
    });
  }

  getProductDetails(productId: number): void {
    // Call the ProductService method to fetch product details by ID
    this.productService.getProductById(productId).subscribe(
      (product: any) => {
        // Assign fetched product details to the variable
        this.product = product; 
        console.log("category:", product.category);
        this.category= product.category;
        this.fetchProducts();
      },
      (error) => {
        console.error('Error fetching product details:', error);
        // Handle errors
      }
    );
  }

  fetchProducts() {
    console.log("category",this.category);
    switch (this.category) {
      case 'electronics':
        this.productService.getElectronicProducts().subscribe(
          (response: any[]) => {
            this.products = response;
            console.log(response);
          },
          (error) => {
            console.error('Error fetching electronic products:', error);
          }
        );
        break;
      case 'jewelery':
        this.productService.getjeweleryProducts().subscribe(
          (response: any[]) => {
            this.products = response;
            console.log(response);
          },
          (error) => {
            console.error('Error fetching jewelry products:', error);
          }
        );
        break;
      case "men's clothing":
        this.productService.getmensProducts().subscribe(
          (response: any[]) => {
            this.products = response;
            console.log(response);
          },
          (error) => {
            console.error('Error fetching men\'s clothing products:', error);
          }
        );
        break;
      case "women's clothing":
        this.productService.getwomensProducts().subscribe(
          (response: any[]) => {
            this.products = response;
            console.log(response);
          },
          (error) => {
            console.error('Error fetching women\'s clothing products:', error);
          }
        );
        break;
      default:
        // default case

        break;
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    console.log('Added to cart:', product);
    // Update cart items in local storage after adding to cart
    this.updateLocalStorage(product);
  }
  updateLocalStorage(product: any) {
    const storedCartItems = localStorage.getItem('cartItems');
    let cartItems: any[] = [];
    if (storedCartItems) {
      cartItems = JSON.parse(storedCartItems);
    }
    // Add the newly added product to the cart items stored locally
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  viewProductDetails(productId: number) {
    if (productId) {
      // Set the product ID to local storage
      localStorage.setItem('productId', productId.toString());
      // Navigate to product details page with product ID as route parameter
      this.router.navigate(['/product-detail', productId]);
    }
  }
  ngOnDestroy(): void {
    // Clear the product ID from local storage
    localStorage.removeItem('productId');
    this.category="";
  }

}
