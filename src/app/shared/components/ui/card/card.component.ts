import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * CardComponent is a reusable container component that provides:
 * - Consistent padding and spacing
 * - Optional header and footer sections
 * - Different variants (default, elevated, bordered)
 * - Custom styling
 * - Content projection for flexible content
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Card container with variant-based styling -->
    <div class="card" [class]="'card-' + variant">
      <!-- Optional header section -->
      <div class="card-header" *ngIf="header">
        <ng-content select="[header]"></ng-content>
      </div>

      <!-- Main card content -->
      <div class="card-content">
        <ng-content></ng-content>
      </div>

      <!-- Optional footer section -->
      <div class="card-footer" *ngIf="footer">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    /* Base card styles */
    .card {
      background-color: #ffffff;
      border-radius: 0.5rem;
      overflow: hidden;
    }

    /* Card variants */
    .card-default {
      border: 1px solid #e5e7eb;
    }

    .card-elevated {
      border: none;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .card-bordered {
      border: 1px solid #e5e7eb;
      box-shadow: none;
    }

    /* Header styles */
    .card-header {
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    /* Content styles */
    .card-content {
      padding: 1rem;
    }

    /* Footer styles */
    .card-footer {
      padding: 1rem;
      border-top: 1px solid #e5e7eb;
      background-color: #f9fafb;
    }
  `]
})
export class CardComponent {
  /** Visual style variant of the card */
  @Input() variant: 'default' | 'elevated' | 'bordered' = 'default';
  /** Whether to show the header section */
  @Input() header: boolean = false;
  /** Whether to show the footer section */
  @Input() footer: boolean = false;
} 