import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * ToastComponent represents a single toast notification.
 * It handles the visual presentation and interaction of individual toasts.
 */
@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Toast container with variant-based styling -->
    <div class="toast" [class]="'toast-' + variant">
      <!-- Icon section (optional) -->
      <div class="toast-icon" *ngIf="showIcon">
        <ng-container [ngSwitch]="variant">
          <span class="icon-success" *ngSwitchCase="'success'">✓</span>
          <span class="icon-error" *ngSwitchCase="'error'">✕</span>
          <span class="icon-warning" *ngSwitchCase="'warning'">⚠</span>
          <span class="icon-info" *ngSwitchCase="'info'">ℹ</span>
        </ng-container>
      </div>

      <!-- Toast content -->
      <div class="toast-content">
        <!-- Title (if provided) -->
        <div class="toast-title" *ngIf="title">{{ title }}</div>
        <!-- Message content -->
        <div class="toast-message">
          <ng-content></ng-content>
        </div>
      </div>

      <!-- Close button -->
      <button class="toast-close" (click)="onClose.emit()">×</button>
    </div>
  `,
  styles: [`
    /* Base toast styles */
    .toast {
      display: flex;
      align-items: flex-start;
      padding: 1rem;
      border-radius: 0.375rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      min-width: 300px;
      max-width: 400px;
      animation: slideIn 0.3s ease-out;
    }

    /* Toast variants */
    .toast-default {
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      color: #1f2937;
    }

    .toast-success {
      background-color: #ecfdf5;
      border: 1px solid #a7f3d0;
      color: #065f46;
    }

    .toast-error {
      background-color: #fef2f2;
      border: 1px solid #fecaca;
      color: #991b1b;
    }

    .toast-warning {
      background-color: #fffbeb;
      border: 1px solid #fef3c7;
      color: #92400e;
    }

    .toast-info {
      background-color: #eff6ff;
      border: 1px solid #dbeafe;
      color: #1e40af;
    }

    /* Icon styles */
    .toast-icon {
      margin-right: 0.75rem;
      font-size: 1.25rem;
    }

    .icon-success { color: #059669; }
    .icon-error { color: #dc2626; }
    .icon-warning { color: #d97706; }
    .icon-info { color: #2563eb; }

    /* Content styles */
    .toast-content {
      flex: 1;
    }

    .toast-title {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .toast-message {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    /* Close button styles */
    .toast-close {
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

    .toast-close:hover {
      opacity: 1;
    }

    /* Animation keyframes */
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class ToastComponent {
  /** Visual style variant of the toast */
  @Input() variant: 'default' | 'success' | 'warning' | 'error' | 'info' = 'default';
  /** Optional title for the toast */
  @Input() title: string = '';
  /** Whether to show an icon with the toast */
  @Input() showIcon: boolean = true;
  /** Event emitted when the toast is closed */
  @Output() onClose = new EventEmitter<void>();
} 