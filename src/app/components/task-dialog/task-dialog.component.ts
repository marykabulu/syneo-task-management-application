/**
 * Component responsible for creating and editing tasks through a dialog interface.
 * Provides a form for users to input task details and handles task creation/updating.
 */
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class TaskDialogComponent {
  // Form group for task details
  taskForm: FormGroup;
  // Title to display in the dialog header
  dialogTitle: string;
  // Available options for task status
  statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'done', label: 'Done' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task | null }
  ) {
    // Set dialog title based on whether we're creating or editing
    this.dialogTitle = data.task ? 'Edit Task' : 'Create Task';
    // Initialize the form with validation rules and existing task data if editing
    this.taskForm = this.fb.group({
      title: [data.task?.title || '', [Validators.required]],
      description: [data.task?.description || '', [Validators.required]],
      status: [data.task?.status || 'todo', [Validators.required]],
      dueDate: [data.task?.dueDate || new Date(), [Validators.required]]
    });
  }

  /**
   * Handles form submission
   * Closes the dialog with the form data if valid
   */
  onSubmit(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  /**
   * Closes the dialog without saving changes
   */
  onCancel(): void {
    this.dialogRef.close();
  }
} 