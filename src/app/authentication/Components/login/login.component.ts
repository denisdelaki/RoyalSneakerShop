import { Component, Input } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //data passage to and from other components 
 
  @Input() isSignup: boolean = true;
  userForm: FormGroup;
  loginform: FormGroup;

  constructor(
    private userService: UserService, 
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar, 
    private auth: AngularFireAuth
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)]]
    });
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)]]
    });
  }

  registerUser() {
    if (this.userForm.valid) {
      const email = this.userForm.value.email;
      const password = this.userForm.value.password;

      this.auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          // Signup successful
          console.log('User signed up successfully:', userCredential.user);
          // Show success snackbar
          this.openSnackBar('Signup successful');
        })
        .catch(error => {
          // Signup failed, handle error
          console.error('Error signing up:', error);
          let errorMessage = 'An error occurred';
          if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'Email is already in use';
          } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Password is too weak';
          }
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
          });
        });
    } else {
      // Log detailed error messages for each form control
      Object.keys(this.userForm.controls).forEach(key => {
        const controlErrors = this.userForm.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Control ' + key + ' has error ' + keyError + ' with value ' + controlErrors[keyError]);
          });
        }
      });
      console.log("invalid");
      // Mark form controls as touched to display validation errors
      this.userForm.markAllAsTouched();
    }
  }

  login() {
    if (this.loginform.valid) {
      const email = this.loginform.value.email;
      const password = this.loginform.value.password;

      this.auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          // Handle successful login
          console.log('User logged in successfully:', userCredential.user);
          // Show success snackbar
          this.openSnackBar('Login successful');
        })
        .catch(error => {
          // Handle login error
          console.error('Error logging in:', error);
          let errorMessage = 'An error occurred';
          console.error(error.code);
          if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
            errorMessage = 'Invalid email or password';
          }
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
          });
        });
    } else {
      Object.keys(this.loginform.controls).forEach(key => {
        const controlErrors = this.loginform.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Control ' + key + ' has error ' + keyError + ' with value ' + controlErrors[keyError]);
          });
        }
      });
      // If the form is invalid, mark all form controls as touched
      this.userForm.markAllAsTouched();
    }
  }

  // Function to open snackbar
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
