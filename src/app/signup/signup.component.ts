import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ){

  }

  ngOnInit(): void{
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      
    })
  }

  togglePassVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void{
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('password')?.value;

    if(password !== confirmPassword){
      this.snackBar.open('Passwords do not match.', 'Close', {duration: 5000, panelClass: 'error-snackbar'})
    }

    this.authService.register(this.signupForm.value).subscribe({
        next: (response) => {
          this.snackBar.open('Sign up successful!', 'Close', {duration: 5000});
        },
        error: (error) => {
          console.log(error);
          this.snackBar.open('Sign up failed. Please try again.', 'Close', {duration: 5000, panelClass: 'error-snackbar'});
        }
      }
    )
  }

}
