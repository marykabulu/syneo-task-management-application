/**
 * Component responsible for handling email verification after registration.
 * Allows users to enter the verification code sent to their email.
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
  selector: 'app-verify-code',
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
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {
  verifyCodeForm: FormGroup;
  email: string | null = null;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.verifyCodeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  ngOnInit(): void {
    // Get the email from storage that was saved during registration
    this.email = localStorage.getItem('pendingVerificationEmail');
    if (!this.email) {
      this.snackBar.open('No email found for verification. Please register first.', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      this.router.navigate(['/register']);
    }
  }

  /**
   * Handles the verification code submission
   * Validates the code and calls the auth service to verify
   */
  onSubmit(): void {
    if (this.verifyCodeForm.valid && this.email) {
      const { code } = this.verifyCodeForm.value;
      
      this.authService.verifyCode(this.email, code).subscribe({
        next: () => {
          // Clear the stored email as it's no longer needed
          localStorage.removeItem('pendingVerificationEmail');
          
          this.snackBar.open('Email verified successfully! You can now login.', 'Close', {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Verification error:', error);
          this.snackBar.open(error.error?.message || 'Verification failed. Please try again.', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.snackBar.open('Please enter a valid 6-digit verification code.', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    }
  }

  /**
   * Resend verification code
   * Not implemented in the current version of the API
   */
  resendCode(): void {
    if (this.email) {
      // TODO: Implement resend code functionality
      this.snackBar.open('Resend code functionality not implemented yet.', 'Close', {
        duration: 5000,
        panelClass: ['warning-snackbar']
      });
    }
  }
}

