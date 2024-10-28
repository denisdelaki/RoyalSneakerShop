import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/service/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  //data passage to and from other components 
 
   isSignup: boolean = false;
  @Output() isLoggedInChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  userForm: FormGroup;
  loginform: FormGroup;

  constructor(
    private userService: UserService, 
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar, 
    private auth: AngularFireAuth,
    private router: Router,
    private shared: SharedService
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)]]
    });
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)]]
    });

    console.log("isSignup:", this.isSignup);
  }

  ngOnInit(): void {
    this.shared.currentSignupState.subscribe((isSignup: boolean) => {
      console.log("isSignup:", isSignup);
      this.isSignup = isSignup;
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
          if (userCredential?.user) {
            localStorage.setItem('userId', userCredential.user.uid);
            console.log('User ID:', userCredential.user.uid);
          }
          // Show success snackbar
          this.openSnackBar('Signup successful');
          // Navigate to 'myprofile' route
          this.shared.updateLoginState(true);
          this.router.navigate(['/features/myprofile']);
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
          if (userCredential?.user) {
            localStorage.setItem('userId', userCredential.user.uid);
            console.log('User ID:', userCredential.user.uid);
          }
          // Show success snackbar
          this.openSnackBar('Login successful');
          this.shared.updateLoginState(true);
          // Navigate to 'myprofile' route
          this.router.navigate(['/features/myprofile']);
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

  initiatePasswordReset() {
    const email = this.loginform.get('email')?.value;
    
    if (!email) {
      this.openSnackBar('Please enter your email address first');
      return;
    }
  
    // First verify if email exists
    this.auth.fetchSignInMethodsForEmail(email)
      .then((signInMethods) => {
        if (signInMethods.length > 0) {
          // Email exists, send reset email
          this.auth.sendPasswordResetEmail(email)
            .then(() => {
              this.openSnackBar('Password reset email sent. Please check your inbox.');
            })
            .catch((error) => {
              this.openSnackBar('Error sending reset email: ' + error.message);
            });
        } else {
          this.openSnackBar('No account found with this email address. Sign up');
        }
      })
      .catch((error) => {
        this.openSnackBar('Error verifying email: ' + error.message);
      });
  }
  
  

  // Function to open snackbar
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
