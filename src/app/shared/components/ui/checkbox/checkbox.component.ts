import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * CheckboxComponent is a reusable form control that provides:
 * - Two-way binding support
 * - Form integration (Reactive Forms)
 * - Custom styling
 * - Disabled state
 * - Label support
 * - Indeterminate state
 */
@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
  template: `
    <!-- Checkbox container with label -->
    <label class="checkbox-container" [class.disabled]="disabled">
      <!-- Custom checkbox input -->
      <div class="checkbox" [class.checked]="checked" [class.indeterminate]="indeterminate">
        <input
          type="checkbox"
          [checked]="checked"
          [disabled]="disabled"
          (change)="onChange($event)"
          (blur)="onBlur()"
        > 
      </div>
      <!-- Label text -->
      <span class="checkbox-label" *ngIf="label">{{ label }}</span>
    </label>
  `,
  styles: [`
    /* Checkbox container styles */
    .checkbox-container {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      user-select: none;
      padding: 0.25rem;
      border-radius: 0.25rem;
      transition: background-color 0.2s;
    }

    .checkbox-container:hover {
      background-color: #f3f4f6;
    }

    .checkbox-container.disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .checkbox-container.disabled:hover {
      background-color: transparent;
    }

    /* Custom checkbox styles */
    .checkbox {
      position: relative;
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid #d1d5db;
      border-radius: 0.25rem;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
    }

    /* Checked state */
    .checkbox.checked {
      background-color: #4a90e2;
      border-color: #4a90e2;
    }

    /* Indeterminate state */
    .checkbox.indeterminate {
      background-color: #4a90e2;
      border-color: #4a90e2;
    }

    .checkbox.indeterminate::after {
      content: '';
      width: 0.75rem;
      height: 2px;
      background-color: white;
      border-radius: 1px;
    }

    /* Native checkbox input */
    .checkbox input {
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    /* Checked state icon */
    .checkbox.checked::after {
      content: '✓';
      color: white;
      font-size: 0.875rem;
      line-height: 1;
    }

    /* Disabled state */
    .checkbox input:disabled {
      cursor: not-allowed;
    }

    /* Label styles */
    .checkbox-label {
      font-size: 0.875rem;
      color: #374151;
      font-weight: 500;
    }

    .checkbox-container.disabled .checkbox-label {
      color: #9ca3af;
    }
  `]
})
export class CheckboxComponent implements ControlValueAccessor {
  /** Label text for the checkbox */
  @Input() label: string = '';
  /** Whether the checkbox is disabled */
  @Input() disabled: boolean = false;
  /** Whether the checkbox is in an indeterminate state */
  @Input() indeterminate: boolean = false;
  /** Current checked state */
  @Input() checked: boolean = false;
  /** Event emitted when the checked state changes */
  @Output() checkedChange = new EventEmitter<boolean>();

  /** Callback function for form value changes */
  private onChangeCallback: (value: boolean) => void = () => {};
  /** Callback function for form blur events */
  private onTouchedCallback: () => void = () => {};

  /**
   * Handles the change event from the checkbox input
   * @param event - The change event
   */
  onChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.checked = checked;
    this.checkedChange.emit(checked);
    this.onChangeCallback(checked);
  }

  /**
   * Handles the blur event from the checkbox input
   */
  onBlur() {
    this.onTouchedCallback();
  }

  /**
   * Writes a new value to the form control
   * @param value - The new value
   */
  writeValue(value: boolean): void {
    this.checked = value;
  }

  /**
   * Registers a callback function for form value changes
   * @param fn - The callback function
   */
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeCallback = fn;
  }

  /**
   * Registers a callback function for form blur events
   * @param fn - The callback function
   */
  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  /**
   * Sets the disabled state of the form control
   * @param isDisabled - Whether the control is disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
} 