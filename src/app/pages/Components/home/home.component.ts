import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input() isSignup: boolean = false;
  showLogin: boolean = false;

  toggleLogin(isSignup: boolean) {
    this.showLogin = true;
    this.isSignup = isSignup;
  }
}
