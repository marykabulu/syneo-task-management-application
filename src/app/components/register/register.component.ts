/**
 * Component responsible for handling user registration functionality.
 * Provides a form for new users to create an account with their personal information.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    LogoComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // Form group for registration with all required fields
  registerForm: FormGroup;
  // Controls password visibility in the form
  hidePassword = true;
  // Controls confirm password visibility in the form
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Initialize the form with validation rules and custom password match validator
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  /**
   * Custom validator to ensure password and confirm password match
   * @param g FormGroup containing the form controls
   * @returns null if passwords match, error object if they don't
   */
  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  /**
   * Handles form submission for registration
   * Validates form and calls auth service to create new user
   * Shows appropriate messages and redirects based on response
   */
  onSubmit(): void {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;
      const name = `${firstName} ${lastName}`;
      
      this.authService.register(name, email, password).subscribe({
        next: (response) => {
          this.snackBar.open('Registration successful! Please check your email for verification code.', 'Close', {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
          // Store email for verification
          localStorage.setItem('pendingVerificationEmail', email);
          this.router.navigate(['/verify-code']);
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.snackBar.open(error.error?.message || 'Registration failed. Please try again.', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    }
  }
}

