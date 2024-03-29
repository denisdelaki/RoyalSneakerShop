import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  @Output() isSignup: EventEmitter<boolean> = new EventEmitter<boolean>();

  login() {
    this.isSignup.emit(false);
  }

  signup() {
    this.isSignup.emit(true);
  }
}
