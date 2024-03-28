import { Component, Input } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Users } from '../../../core/Models/Users';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @Input() isSignup: boolean = true; 
  
  constructor(private userService: UserService) { }
  registerUser() {
    // Example usage of register method
    const newUser: Users = {
      username: 'JohnDoe',
      email: 'john@example.com',
      profile_pic: 'profile.jpg',
      password: 'password123',
      confirm_password: 'password123'
    };
console.log(newUser);
    this.userService.register(newUser).subscribe(response => {
      console.log(response);
    });
  }
  login() {
    throw new Error('Method not implemented.');
    }
}
