import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Interface defining the structure of a toast notification
 */
export interface Toast {
  /** Unique identifier for the toast */
  id: number;
  /** Visual style variant of the toast */
  variant: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Optional title for the toast */
  title?: string;
  /** Main message content of the toast */
  message: string;
  /** Whether to show an icon with the toast */
  showIcon?: boolean;
  /** Duration in milliseconds before the toast auto-dismisses (0 for no auto-dismiss) */
  duration?: number;
}

/**
 * ToastService manages toast notifications throughout the application.
 * It provides methods to show different types of toasts and handles their lifecycle.
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  /** Subject to manage the list of active toasts */
  private toasts = new BehaviorSubject<Toast[]>([]);
  /** Counter to generate unique toast IDs */
  private toastId = 0;

  /** Observable stream of active toasts */
  toasts$ = this.toasts.asObservable();

  /**
   * Shows a new toast notification
   * @param toast - Toast configuration object
   * @returns The ID of the created toast
   */
  show(toast: Omit<Toast, 'id'>) {
    const id = ++this.toastId;
    const newToast = { ...toast, id };
    
    // Add the new toast to the list
    this.toasts.next([...this.toasts.value, newToast]);

    // Set up auto-dismiss if duration is specified
    if (toast.duration !== 0) {
      setTimeout(() => {
        this.remove(id);
      }, toast.duration || 5000); // Default to 5 seconds if not specified
    }

    return id;
  }

  /**
   * Removes a toast by its ID
   * @param id - The ID of the toast to remove
   */
  remove(id: number) {
    this.toasts.next(this.toasts.value.filter(toast => toast.id !== id));
  }

  /**
   * Shows a success toast
   * @param message - The success message to display
   * @param title - Optional title for the toast
   * @param duration - Optional duration before auto-dismiss
   * @returns The ID of the created toast
   */
  success(message: string, title?: string, duration?: number) {
    return this.show({
      variant: 'success',
      title,
      message,
      showIcon: true,
      duration
    });
  }

  /**
   * Shows an error toast
   * @param message - The error message to display
   * @param title - Optional title for the toast
   * @param duration - Optional duration before auto-dismiss
   * @returns The ID of the created toast
   */
  error(message: string, title?: string, duration?: number) {
    return this.show({
      variant: 'error',
      title,
      message,
      showIcon: true,
      duration
    });
  }

  /**
   * Shows a warning toast
   * @param message - The warning message to display
   * @param title - Optional title for the toast
   * @param duration - Optional duration before auto-dismiss
   * @returns The ID of the created toast
   */
  warning(message: string, title?: string, duration?: number) {
    return this.show({
      variant: 'warning',
      title,
      message,
      showIcon: true,
      duration
    });
  }

  /**
   * Shows an info toast
   * @param message - The info message to display
   * @param title - Optional title for the toast
   * @param duration - Optional duration before auto-dismiss
   * @returns The ID of the created toast
   */
  info(message: string, title?: string, duration?: number) {
    return this.show({
      variant: 'info',
      title,
      message,
      showIcon: true,
      duration
    });
  }
} 