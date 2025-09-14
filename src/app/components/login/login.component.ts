/**
 * Component responsible for handling user login functionality.
 * Provides a form for users to enter their email and password to authenticate.
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
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-login',
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
    MatSelectModule,
    LogoComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Form group for login with email and password fields
  loginForm: FormGroup;
  // Controls password visibility in the form
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Initialize the form with validation rules
    this.loginForm = this.fb.group({
      userRole: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  /**
   * Handles form submission for login
   * Validates form and calls auth service to authenticate user
   * Redirects to dashboard on success
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { userRole, email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          // Show success message
          this.snackBar.open('Sign in successful!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          // Navigate based on user role
          console.log('Selected user role:', userRole);
          setTimeout(() => {
            switch(userRole) {
              case 'student':
                console.log('Navigating to dashboard');
                this.router.navigate(['/dashboard']);
                break;
              case 'teacher':
                console.log('Navigating to teacher');
                this.router.navigate(['/teacher']);
                break;
              case 'parent':
                console.log('Navigating to parent');
                this.router.navigate(['/parent']);
                break;
              case 'admin':
                console.log('Navigating to dashboard (admin)');
                this.router.navigate(['/dashboard']);
                break;
              default:
                console.log('Navigating to dashboard (default)');
                this.router.navigate(['/dashboard']);
            }
          }, 1000);
        },
        error: (error) => {
          // Show error message
          this.snackBar.open(error.message || 'Login failed', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
          console.error('Login error:', error);
        }
      });
    }
  }
} 