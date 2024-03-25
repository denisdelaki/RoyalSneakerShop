import { Component } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  isSignup: boolean=false;

  signup() {
    // Set isSignup to true
    this.isSignup = true;
    console.log("signup",this.isSignup)
  }

  login() {
    // Set isSignup to false
    this.isSignup = false;
    console.log("login",this.isSignup)
  }
}
