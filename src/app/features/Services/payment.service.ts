// payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private backendUrl = 'http://localhost:3000/initiate-stk-push'; 

  constructor(private http: HttpClient) {}

  initiateSTKPush(mobileNumber: string, amount: Number): Observable<any> {
    const payload = {
      mobileNumber,
      amount
    };

    return this.http.post<any>(`${this.backendUrl}`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
