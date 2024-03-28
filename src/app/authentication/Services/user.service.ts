import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../../core/Models/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://fakestoreapi.com/users'; 

  constructor(private http: HttpClient) { }

  // User registration
  register(user: Users): Observable<any> {
    console.log(user)
    return this.http.post<any>(`${this.apiUrl}`, user);
    
  }

  // User login
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { email, password });
  }

  // Update user profile
  updateProfile(user: Users): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, user);
  }
}
