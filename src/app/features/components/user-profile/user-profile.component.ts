import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  userProfileForm!: FormGroup;
  passwordChangeForm!: FormGroup;
  public userData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    city: string;
    country: string;
  } = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    country: '',
  }
  fullName='';
  isEditMode: boolean = false;

  public userId: string = '';
  constructor(
    private firestore: AngularFirestore, 
    private router: Router,
    private toast: MatSnackBar,
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
  ) {
    this.userId = localStorage.getItem('userId') || '';

      // Initialize the password change form
  this.passwordChangeForm = this.formBuilder.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)]],
    confirmPassword: ['', [Validators.required]]
  })
  }

  ngOnInit(): void {
   this.userProfileForm= new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      phonenumber: new FormControl(),
      email: new FormControl(),
      address: new FormControl(),
      city: new FormControl(),
      country: new FormControl(),
  });

  this.userProfileForm.disable();

  // Fetch user data if available 
  if (this.userId) {
    this.getUserProfile();
    this.fullName = this.userData.firstName + ' ' + this.userData.lastName;
  }
}

toggleEditMode() {
  this.isEditMode = !this.isEditMode;
  if (this.isEditMode) {
    this.userProfileForm.enable();
  } else {
    this.userProfileForm.disable();
  }
}

private showToastMessage(message: string, action: string) {
  this.toast.open(message, action, {
    duration: 3000, 
    verticalPosition: 'top', 
    horizontalPosition: 'center',
  });
}

getUserProfile() {
  this.firestore.collection('users').doc(this.userId!)
    .get()
    .subscribe((doc) => {
      if (doc.exists) {
        const userData = doc.data() as { firstName: string; lastName: string; phoneNumber: string; email: string; address: string; city: string; country: string; };
        this.userData = userData;
        this.fullName = this.userData.firstName + ' ' + this.userData.lastName;
        this.userProfileForm.patchValue(userData);
      }
    });
}

  onSubmit() {
    if (this.userProfileForm.valid && this.userId) {
      this.updateUserProfile();
    }else{
      this.toast.open("form is invalid", 'error',  { duration: 3000 });
    }
  }

  updateUserProfile() {
    const userData = this.userProfileForm.value;
    
    console.log("userid", this.userId);
    this.firestore.collection('users').doc(this.userId!)
      .set(userData, { merge: true })
      .then(() => {
        this.toast.open('Profile updated successfully', 'success', { duration: 3000 });
        //navigate to homepage after successful update
         this.router.navigate(['/']);
      })
      .catch((error) => {
        this.toast.open('Error updating profile. Please try again later.', 'error',  { duration: 3000 });
      });
  }

  async onPasswordChange() {
    if (this.passwordChangeForm.valid) {
      const currentPassword = this.passwordChangeForm.get('currentPassword')?.value;
      const newPassword = this.passwordChangeForm.get('newPassword')?.value;
      const confirmPassword = this.passwordChangeForm.get('confirmPassword')?.value;
  
      if (newPassword !== confirmPassword) {
        this.toast.open('New passwords do not match', 'Close', { duration: 3000 });
        return;
      }

      if (currentPassword === newPassword) {
        this.toast.open('Do not use the previous passwords', 'Close', { duration: 3000 });
        return;
      }
  
      try {
        const user = await this.auth.currentUser;
        if (user?.email) {
          const credential = await this.auth.signInWithEmailAndPassword(user.email, currentPassword);
          await user.updatePassword(newPassword);
          this.toast.open('Password updated successfully', 'Close', { duration: 3000 });
          this.passwordChangeForm.reset();
        }
      } catch (error) {
        this.toast.open('Error updating password. Please check your current password.', 'Close', { duration: 3000 });
      }
    }
  }

}


