import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fbuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ){ }

  ngOnInit(): void {
    this.loginForm = this.fbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  togglePassVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void{
    const password = this.loginForm.get('password')?.value;
    const email = this.loginForm.get('email')?.value;

    this.authService.login(email, password).subscribe({
        next: (response) => {
          if(UserStorageService.isAdminLoggedIn()){
            // this.router.navigateByUrl("/admin/dashboard")
            this.router.navigate(['/admin/dashboard'])
          }
          if(UserStorageService.isCustomerLoggedIn()){
            this.router.navigateByUrl("/customer/dashboard")
          }
          this.snackBar.open('Login successful!', 'Close', {duration: 5000}); 
        },
        error: (error) => {
          console.log(error);
          this.snackBar.open('Login failed. Please try again.', 'Close', {duration: 5000, panelClass: 'error-snackbar'});
        }
      }
    )
  }

}
