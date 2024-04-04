import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl: string = 'https://fakestoreapi.com/products';
  private jeweleryapiUrl: string = 'https://fakestoreapi.com/products/category/jewelery';
  private electronicapiUrl: string = 'https://fakestoreapi.com/products/category/electronics';
  private mensapiUrl: string = 'https://fakestoreapi.com/products/category/men%27s%20clothing';
  private womensapiUrl: string = 'https://fakestoreapi.com/products/category/women%27s%20clothing';

  constructor(private http: HttpClient) { }

  // Method to fetch products from the API
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getjeweleryProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.jeweleryapiUrl);
  }
  getElectronicProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.electronicapiUrl);
  }
  getmensProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.mensapiUrl);
  }
  getwomensProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.womensapiUrl);
  }
  // Method to fetch a single product by ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Method to update a product
  updateProduct(id: number, updatedProduct: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedProduct);
  }

  // Method to handle errors
  private handleError(error: any) {
    console.error('An error occurred:', error);
    throw error; // You can throw your own custom error here if needed
  }
}
