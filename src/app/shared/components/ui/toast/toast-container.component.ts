import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from './toast.service';
import { ToastComponent } from './toast.component';

/**
 * ToastContainerComponent manages the display of toast notifications.
 * It subscribes to the ToastService and renders individual toast components.
 */
@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  template: `
    <!-- Container for all toast notifications -->
    <div class="toast-container">
      <!-- Render each toast using the ToastComponent -->
      <app-toast
        *ngFor="let toast of toasts$ | async"
        [variant]="toast.variant"
        [title]="toast.title || ''"
        [showIcon]="toast.showIcon ?? true"
        (close)="onClose(toast.id)"
      >
        {{ toast.message }}
      </app-toast>
    </div>
  `,
  styles: [`
    /* Fixed position container for toasts */
    .toast-container {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  `]
})
export class ToastContainerComponent implements OnInit {
  /** Observable stream of active toasts from the service */
  toasts$ = this.toastService.toasts$;

  constructor(private toastService: ToastService) {}

  ngOnInit() {}

  /**
   * Handles the close event from a toast
   * @param id - The ID of the toast to remove
   */
  onClose(id: number) {
    this.toastService.remove(id);
  }
} 