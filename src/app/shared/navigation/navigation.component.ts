import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  @Output() isSignup: EventEmitter<boolean> = new EventEmitter<boolean>();
  isLoggedIn: boolean = false;
  constructor(private router: Router) {
    // Check if there's a user ID in local storage upon component initialization
    const userId = localStorage.getItem('userId');
    if (userId) {
        // If user ID exists, set isLoggedIn to true
        this.isLoggedIn = true;
    }
}
  login() {
    this.isSignup.emit(false);
    this.isLoggedIn = true;
  }

  signup() {
    this.isSignup.emit(true);
    this.isLoggedIn = true;
  }
  logout() {
    localStorage.removeItem('userId');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
