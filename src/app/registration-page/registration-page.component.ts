import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../shared/components/ui/button/button.component';
import { InputComponent } from '../shared/components/ui/input/input.component';
import { CardComponent } from '../shared/components/ui/card/card.component';
import { AlertComponent } from '../shared/components/ui/alert/alert.component';
import { CheckboxComponent } from '../shared/components/ui/checkbox/checkbox.component';
import { ToastContainerComponent } from '../shared/components/ui/toast/toast-container.component';
import { ToastService } from '../shared/components/ui/toast/toast.service';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent,
    CardComponent,
    AlertComponent,
    CheckboxComponent,
    ToastContainerComponent
  ],
  template: `
    <div class="registration-container">
      <app-card class="registration-form">
        <div class="logo-section">
          <img src="assets/logo.png" alt="Logo" class="logo">
        </div>

        <div class="welcome-section">
          <h1>Create Account</h1>
          <p>Please fill in your details to register</p>
        </div>

        <div class="form-group">
          <app-input
            type="text"
            placeholder="Enter your name"
            [(value)]="name"
            (onChange)="clearError()">
          </app-input>
        </div>

        <div class="form-group">
          <app-input
            type="email"
            placeholder="Enter your email"
            [(value)]="email"
            (onChange)="clearError()">
          </app-input>
        </div>

        <div class="form-group">
          <div class="password-input">
            <app-input
              [type]="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              [(value)]="password"
              (onChange)="clearError()">
            </app-input>
            <button 
              type="button" 
              class="toggle-password" 
              (click)="togglePasswordVisibility()">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>

        <div class="form-group">
          <div class="password-input">
            <app-input
              [type]="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm your password"
              [(value)]="confirmPassword"
              (onChange)="clearError()">
            </app-input>
            <button 
              type="button" 
              class="toggle-password" 
              (click)="toggleConfirmPasswordVisibility()">
              {{ showConfirmPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>

        <div class="form-group">
          <app-checkbox
            [(checked)]="acceptTerms"
            (onChange)="clearError()">
            I accept the Terms of use and Privacy Policy
          </app-checkbox>
        </div>

        <app-alert
          *ngIf="errorMessage"
          variant="error"
          [showIcon]="true">
          {{ errorMessage }}
        </app-alert>

        <app-button
          (onClick)="onSubmit()"
          variant="primary"
          class="register-btn"
          [disabled]="isLoading">
          {{ isLoading ? 'Creating account...' : 'Create account' }}
        </app-button>

        <p class="login-link">
          Already have an account? 
          <a href="#" (click)="navigateToLogin(); $event.preventDefault()">Sign in</a>
        </p>
      </app-card>
    </div>
    <app-toast-container></app-toast-container>
  `,
  styles: [`
    .registration-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
      background-color: #ffffff;
    }

    .registration-form {
      width: 100%;
      max-width: 400px;
      padding: 40px;
    }

    .logo-section {
      text-align: center;
      margin-bottom: 40px;
    }

    .logo {
      width: 120px;
      height: auto;
    }

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

    .form-group {
      margin-bottom: 24px;
    }

    .password-input {
      position: relative;
      display: flex;
      align-items: center;
    }

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

    .register-btn {
      width: 100%;
      margin-top: 24px;
    }

    .login-link {
      text-align: center;
      margin-top: 24px;
      color: #666;
      font-size: 14px;
    }

    .login-link a {
      color: #4a90e2;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .login-link a:hover {
      color: #357abd;
      text-decoration: underline;
    }
  `]
})
export class RegistrationPageComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  acceptTerms: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private toastService: ToastService
  ) {}

  onSubmit() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (!this.acceptTerms) {
      this.errorMessage = 'Please accept the terms and conditions';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // TODO: Implement actual registration logic with your backend
    // For now, just simulate an API call
    setTimeout(() => {
      this.isLoading = false;
      this.toastService.success('Account created successfully!');
      this.router.navigate(['/login']);
    }, 1500);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  clearError() {
    this.errorMessage = '';
  }
} 