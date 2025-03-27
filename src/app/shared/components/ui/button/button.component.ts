import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * ButtonComponent is a reusable button component that supports:
 * - Different variants (primary, secondary, outline, text)
 * - Different sizes (sm, md, lg)
 * - Loading state with spinner
 * - Disabled state
 * - Icon support (prefix and suffix)
 * - Full width option
 * - Custom styling
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Button container with variant and size classes -->
    <button
      [class]="'btn btn-' + variant + ' btn-' + size + (fullWidth ? ' w-full' : '')"
      [disabled]="disabled || loading"
      (click)="onClick.emit($event)"
    >
      <!-- Loading spinner -->
      <div class="spinner" *ngIf="loading"></div>
      
      <!-- Button content -->
      <div class="btn-content" [class.loading]="loading">
        <!-- Optional prefix icon -->
        <span class="btn-prefix" *ngIf="prefix">
          <ng-content select="[prefix]"></ng-content>
        </span>
        
        <!-- Button text -->
        <ng-content></ng-content>
        
        <!-- Optional suffix icon -->
        <span class="btn-suffix" *ngIf="suffix">
          <ng-content select="[suffix]"></ng-content>
        </span>
      </div>
    </button>
  `,
  styles: [`
    /* Base button styles */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      border-radius: 0.375rem;
      transition: all 0.2s;
      cursor: pointer;
      position: relative;
      gap: 0.5rem;
    }

    /* Button variants */
    .btn-primary {
      background-color: #4a90e2;
      color: white;
      border: none;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #357abd;
    }

    .btn-secondary {
      background-color: #6b7280;
      color: white;
      border: none;
    }

    .btn-secondary:hover:not(:disabled) {
      background-color: #4b5563;
    }

    .btn-outline {
      background-color: transparent;
      color: #4a90e2;
      border: 1px solid #4a90e2;
    }

    .btn-outline:hover:not(:disabled) {
      background-color: #4a90e2;
      color: white;
    }

    .btn-text {
      background-color: transparent;
      color: #4a90e2;
      border: none;
      padding: 0;
    }

    .btn-text:hover:not(:disabled) {
      color: #357abd;
      text-decoration: underline;
    }

    /* Button sizes */
    .btn-sm {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
    }

    .btn-md {
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }

    .btn-lg {
      padding: 0.75rem 1.5rem;
      font-size: 1.125rem;
    }

    /* Disabled state */
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Loading state */
    .btn-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .btn-content.loading {
      opacity: 0;
    }

    /* Loading spinner */
    .spinner {
      position: absolute;
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 0.8s linear infinite;
    }

    /* Icon styles */
    .btn-prefix, .btn-suffix {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Full width option */
    .w-full {
      width: 100%;
    }

    /* Spinner animation */
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `]
})
export class ButtonComponent {
  /** Visual style variant of the button */
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'text' = 'primary';
  /** Size of the button */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  /** Whether the button is disabled */
  @Input() disabled: boolean = false;
  /** Whether the button is in loading state */
  @Input() loading: boolean = false;
  /** Whether to show prefix content */
  @Input() prefix: boolean = false;
  /** Whether to show suffix content */
  @Input() suffix: boolean = false;
  /** Whether the button should take full width */
  @Input() fullWidth: boolean = false;
  /** Event emitted when the button is clicked */
  @Output() onClick = new EventEmitter<MouseEvent>();
} 