import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() {
    
   }

  private signupSource = new BehaviorSubject<boolean>(false);
  currentSignupState = this.signupSource.asObservable();

  private loginStateSource = new BehaviorSubject<boolean>(false);
  currentLoginState = this.loginStateSource.asObservable();

  changeSignupState(isSignup: boolean) {
    this.signupSource.next(isSignup);
  }

  updateLoginState(isLoggedIn: boolean) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.loginStateSource.next(true);
    } else {
      this.loginStateSource.next(isLoggedIn);
    }
  }

}
