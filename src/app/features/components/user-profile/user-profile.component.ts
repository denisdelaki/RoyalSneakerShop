import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  userProfileForm!: FormGroup;
  ngOnInit(): void {
   this.userProfileForm= new FormGroup({
      firstName: new FormControl(),
      lastname: new FormControl(),
      phonenumber: new FormControl(),
      email: new FormControl(),
      address: new FormControl(),
      city: new FormControl(),
      country: new FormControl(),
  });
  }

}


