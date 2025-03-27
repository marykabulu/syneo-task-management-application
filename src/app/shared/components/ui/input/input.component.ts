import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * InputComponent is a reusable form input component that provides:
 * - Different input types
 * - Form validation states
 * - Two-way binding
 * - Prefix and suffix content projection
 * - Custom styling
 */
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <!-- Input container with validation states -->
    <div class="input-container" [class]="'input-' + (disabled ? 'disabled' : '')">
      <!-- Optional prefix content -->
      <div class="input-prefix" *ngIf="prefix">
        <ng-content select="[prefix]"></ng-content>
      </div>

      <!-- Input field -->
      <input
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [value]="value"
        (input)="onInputChange($event)"
        (focus)="onFocus.emit($event)"
        (blur)="onTouched(); onBlur.emit($event)"
      >

      <!-- Optional suffix content -->
      <div class="input-suffix" *ngIf="suffix">
        <ng-content select="[suffix]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    /* Input container styles */
    .input-container {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      transition: all 0.2s;
      min-height: 2.75rem;
      margin-bottom: 0.5rem;
    }

    /* Input field styles */
    .input-container input {
      flex: 1;
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      line-height: 1.25;
      color: #1a1a1a;
      background: transparent;
      border: none;
      outline: none;
    }

    .input-container input::placeholder {
      color: #94a3b8;
      opacity: 1;
    }

    /* Focus state */
    .input-container:focus-within {
      border-color: #3b82f6;
      box-shadow: 0 0 0 1px #3b82f6;
    }

    /* Disabled state */
    .input-disabled {
      background-color: #f8fafc;
      cursor: not-allowed;
    }

    .input-disabled input {
      color: #94a3b8;
      cursor: not-allowed;
    }

    /* Prefix and suffix styles */
    .input-prefix,
    .input-suffix {
      display: flex;
      align-items: center;
      padding: 0 0.75rem;
      color: #64748b;
    }

    .input-prefix {
      border-right: 1px solid #e2e8f0;
    }

    .input-suffix {
      border-left: 1px solid #e2e8f0;
    }
  `]
})
export class InputComponent implements ControlValueAccessor {
  /** Type of the input field */
  @Input() type: string = 'text';
  /** Placeholder text */
  @Input() placeholder: string = '';
  /** Whether the input is disabled */
  @Input() disabled: boolean = false;
  /** Whether to show prefix content */
  @Input() prefix: boolean = false;
  /** Whether to show suffix content */
  @Input() suffix: boolean = false;
  /** Current value of the input */
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  /** Event emitted when the input receives focus */
  @Output() onFocus = new EventEmitter<FocusEvent>();
  /** Event emitted when the input loses focus */
  @Output() onBlur = new EventEmitter<FocusEvent>();

  // ControlValueAccessor implementation
  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  /**
   * Handles input changes and emits the new value
   * @param event - The input event
   */
  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  /**
   * Writes a new value to the input
   * @param value - The new value
   */
  writeValue(value: string): void {
    this.value = value || '';
  }

  /**
   * Registers a callback function for value changes
   * @param fn - The callback function
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function for touched events
   * @param fn - The callback function
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the input
   * @param isDisabled - Whether the input is disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
} 