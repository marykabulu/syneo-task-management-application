import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/components/ui/toast/toast.service';
import { ToastContainerComponent } from '../../shared/components/ui/toast/toast-container.component';
import { InputComponent } from '../../shared/components/ui/input/input.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { CheckboxComponent } from '../../shared/components/ui/checkbox/checkbox.component';
import { AlertComponent } from '../../shared/components/ui/alert/alert.component';

/**
 * LoginPageComponent handles the user authentication process.
 * It provides a form for users to enter their credentials and handles form validation.
 */
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastContainerComponent,
    InputComponent,
    ButtonComponent,
    CardComponent,
    CheckboxComponent,
    AlertComponent
  ],
  template: `
    <!-- Main container for the login page -->
    <div class="login-container">
      <!-- Card component to contain the login form -->
      <app-card class="login-form">
        <!-- Logo section -->
        <div class="logo-section">
          <img src="assets/logo.png" alt="Logo" class="logo">
        </div>

        <!-- Welcome message section -->
        <div class="welcome-section">
          <h1>Welcome Back</h1>
          <p>Please sign in to your account</p>
        </div>

        <!-- Login form with validation -->
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <!-- Email input field -->
          <div class="form-group">
            <app-input
              type="email"
              placeholder="Enter your email"
              formControlName="email"
              (onChange)="clearError()"
              (blur)="onFieldBlur('email')"
              [class.error]="isFieldInvalid('email')">
            </app-input>
            <div class="error-message" *ngIf="isFieldInvalid('email', 'required')">
              Email is required
            </div>
            <div class="error-message" *ngIf="isFieldInvalid('email', 'email')">
              Please enter a valid email
            </div>
          </div>

          <!-- Password input field with show/hide toggle -->
          <div class="form-group">
            <div class="password-input">
              <app-input
                [type]="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                formControlName="password"
                (onChange)="clearError()"
                (blur)="onFieldBlur('password')"
                [class.error]="isFieldInvalid('password')">
              </app-input>
              <button 
                type="button" 
                class="toggle-password" 
                (click)="togglePasswordVisibility()">
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
            <div class="error-message" *ngIf="isFieldInvalid('password', 'required')">
              Password is required
            </div>
            <div class="error-message" *ngIf="isFieldInvalid('password', 'minlength')">
              Password must be at least 6 characters
            </div>
          </div>

          <!-- Remember me checkbox -->
          <div class="form-group">
            <app-checkbox
              [(checked)]="rememberMe"
              label="Remember me"
              (checkedChange)="onRememberMeChange($event)">
            </app-checkbox>
          </div>

          <!-- Error alert for general form errors -->
          <app-alert
            *ngIf="errorMessage"
            variant="error"
            [showIcon]="true">
            {{ errorMessage }}
          </app-alert>

          <!-- Submit button -->
          <app-button
            type="submit"
            variant="primary"
            class="login-btn"
            [disabled]="isLoading || loginForm.invalid">
            {{ isLoading ? 'Signing in...' : 'Sign in' }}
          </app-button>
        </form>

        <!-- Additional links section -->
        <div class="links">
          <a href="#" (click)="navigateToForgotPassword(); $event.preventDefault()">Forgot password?</a>
          <p>
            Don't have an account? 
            <a href="#" (click)="navigateToRegister(); $event.preventDefault()">Sign up</a>
          </p>
        </div>
      </app-card>
    </div>
    <!-- Toast container for notifications -->
    <app-toast-container></app-toast-container>
  `,
  styles: [`
    /* Main container styles */
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
      background-color: #ffffff;
    }

    /* Login form card styles */
    .login-form {
      width: 100%;
      max-width: 400px;
      padding: 40px;
    }

    /* Logo section styles */
    .logo-section {
      text-align: center;
      margin-bottom: 40px;
    }

    .logo {
      width: 120px;
      height: auto;
    }

    /* Welcome section styles */
    .welcome-section {
      text-align: center;
      margin-bottom: 40px;
    }

    .welcome-section h1 {
      font-size: 28px;
      color: #1a1a1a;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .welcome-section p {
      color: #666;
      font-size: 16px;
    }

    /* Form group styles */
    .form-group {
      margin-bottom: 24px;
      position: relative;
    }

    /* Error message styles */
    .error-message {
      color: #e53e3e;
      font-size: 12px;
      margin-top: 4px;
    }

    /* Password input container styles */
    .password-input {
      position: relative;
      display: flex;
      align-items: center;
    }

    /* Show/hide password button styles */
    .toggle-password {
      position: absolute;
      right: 16px;
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
      font-size: 14px;
      padding: 0;
      transition: color 0.2s ease;
      z-index: 1;
    }

    .toggle-password:hover {
      color: #4a90e2;
    }

    /* Login button styles */
    .login-btn {
      width: 100%;
      margin-top: 24px;
    }

    /* Links section styles */
    .links {
      text-align: center;
      margin-top: 24px;
    }

    .links a {
      color: #4a90e2;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .links a:hover {
      color: #357abd;
      text-decoration: underline;
    }

    .links p {
      margin-top: 16px;
      color: #666;
      font-size: 14px;
    }
  `]
})
export class LoginPageComponent implements OnInit, AfterViewInit {
  // Form group for managing form controls
  loginForm: FormGroup;
  // Flag to toggle password visibility
  showPassword: boolean = false;
  // Flag for remember me checkbox
  rememberMe: boolean = false;
  // General error message for the form
  errorMessage: string = '';
  // Loading state for form submission
  isLoading: boolean = false;
  // Set to track which fields have been touched
  touchedFields: Set<string> = new Set();
  // Flag to track if form has been initialized
  isFormInitialized: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService
  ) {
    // Initialize the form with validation rules
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Check if there are saved credentials
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    
    if (savedEmail && savedPassword) {
      this.rememberMe = true;
      this.loginForm.patchValue({
        email: savedEmail,
        password: savedPassword
      });
    }
  }

  ngAfterViewInit(): void {
    // Initialize form state after view is ready
    setTimeout(() => {
      this.isFormInitialized = true;
      // Mark all fields as touched to show initial validation state
      Object.keys(this.loginForm.controls).forEach(key => {
        this.touchedFields.add(key);
      });
    });
  }

  /**
   * Checks if a form field is invalid based on the error type
   * @param fieldName - The name of the form field to check
   * @param errorType - Optional error type to check for
   * @returns boolean indicating if the field is invalid
   */
  isFieldInvalid(fieldName: string, errorType?: string): boolean {
    if (!this.isFormInitialized) return false;
    
    const field = this.loginForm.get(fieldName);
    if (!field) return false;

    if (errorType) {
      return (this.touchedFields.has(fieldName) && (field.hasError(errorType) ?? false));
    }
    
    return this.touchedFields.has(fieldName) && field.invalid;
  }

  /**
   * Marks a field as touched when it loses focus
   * @param fieldName - The name of the field that was blurred
   */
  onFieldBlur(fieldName: string) {
    this.touchedFields.add(fieldName);
  }

  /**
   * Handles form submission
   * Validates the form and processes login if valid
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.touchedFields.add(key);
      });
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    // TODO: Implement actual login logic with your backend
    // For now, just simulate an API call
    setTimeout(() => {
      this.isLoading = false;
      this.toastService.success('Login successful!');
      this.router.navigate(['/dashboard']);
    }, 1500);
  }

  /**
   * Navigates to the registration page
   */
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  /**
   * Navigates to the forgot password page
   */
  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  /**
   * Toggles password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Clears the general error message
   */
  clearError(): void {
    this.errorMessage = '';
  }

  onRememberMeChange(checked: boolean): void {
    this.rememberMe = checked;
    if (checked) {
      // Save credentials to localStorage
      const { email, password } = this.loginForm.value;
      localStorage.setItem('rememberedEmail', email);
      localStorage.setItem('rememberedPassword', password);
    } else {
      // Remove saved credentials
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    }
  }
} 