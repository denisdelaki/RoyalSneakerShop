import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';

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
    private route: ActivatedRoute
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
  ngOnDestroy(): void {
    // Clear the product ID from local storage
    localStorage.removeItem('productId');
    this.category="";
  }

}
