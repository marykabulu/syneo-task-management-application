import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * AlertComponent is a reusable alert component that provides:
 * - Different variants (success, error, warning, info)
 * - Optional title and icon
 * - Dismissible option
 * - Custom styling
 * - Content projection for flexible content
 */
@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Alert container with variant-based styling -->
    <div class="alert" [class]="'alert-' + variant" role="alert">
      <!-- Icon section (optional) -->
      <div class="alert-icon" *ngIf="showIcon">
        <ng-container [ngSwitch]="variant">
          <span class="icon-success" *ngSwitchCase="'success'">✓</span>
          <span class="icon-error" *ngSwitchCase="'error'">✕</span>
          <span class="icon-warning" *ngSwitchCase="'warning'">⚠</span>
          <span class="icon-info" *ngSwitchCase="'info'">ℹ</span>
        </ng-container>
      </div>

      <!-- Alert content -->
      <div class="alert-content">
        <!-- Title (if provided) -->
        <div class="alert-title" *ngIf="title">{{ title }}</div>
        <!-- Message content -->
        <div class="alert-message">
          <ng-content></ng-content>
        </div>
      </div>

      <!-- Close button (if dismissible) -->
      <button 
        class="alert-close" 
        *ngIf="dismissible"
        (click)="onClose.emit()"
        aria-label="Close alert"
      >×</button>
    </div>
  `,
  styles: [`
    /* Base alert styles */
    .alert {
      display: flex;
      align-items: flex-start;
      padding: 1rem;
      border-radius: 0.375rem;
      margin-bottom: 1rem;
    }

    /* Alert variants */
    .alert-success {
      background-color: #ecfdf5;
      border: 1px solid #a7f3d0;
      color: #065f46;
    }

    .alert-error {
      background-color: #fef2f2;
      border: 1px solid #fecaca;
      color: #991b1b;
    }

    .alert-warning {
      background-color: #fffbeb;
      border: 1px solid #fef3c7;
      color: #92400e;
    }

    .alert-info {
      background-color: #eff6ff;
      border: 1px solid #dbeafe;
      color: #1e40af;
    }

    /* Icon styles */
    .alert-icon {
      margin-right: 0.75rem;
      font-size: 1.25rem;
    }

    .icon-success { color: #059669; }
    .icon-error { color: #dc2626; }
    .icon-warning { color: #d97706; }
    .icon-info { color: #2563eb; }

    /* Content styles */
    .alert-content {
      flex: 1;
    }

    .alert-title {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .alert-message {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    /* Close button styles */
    .alert-close {
      background: none;
      border: none;
      color: inherit;
      opacity: 0.5;
      font-size: 1.5rem;
      line-height: 1;
      padding: 0;
      margin-left: 0.75rem;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .alert-close:hover {
      opacity: 1;
    }
  `]
})
export class AlertComponent {
  /** Visual style variant of the alert */
  @Input() variant: 'success' | 'error' | 'warning' | 'info' = 'info';
  /** Optional title for the alert */
  @Input() title: string = '';
  /** Whether to show an icon with the alert */
  @Input() showIcon: boolean = true;
  /** Whether the alert can be dismissed */
  @Input() dismissible: boolean = false;
  /** Event emitted when the alert is closed */
  @Output() onClose = new EventEmitter<void>();
} 