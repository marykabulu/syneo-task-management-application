/**
 * Component responsible for displaying and managing tasks in the application.
 * Provides functionality to view, create, edit, and delete tasks.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskService } from '../../services/task.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Array to store all tasks
  tasks: Task[] = [];

  constructor(
    public taskService: TaskService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Load tasks when component initializes
    this.loadTasks();
  }

  /**
   * Loads all tasks from the task service
   * Updates the tasks array with the fetched data
   */
  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
      }
    });
  }

  /**
   * Opens the task dialog for creating or editing a task
   * @param task The task to edit, or null for creating a new task
   */
  openTaskDialog(task: Task | null): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task) {
          this.updateTask(task.id, result);
        } else {
          this.createTask(result);
        }
      }
    });
  }

  /**
   * Creates a new task using the task service
   * @param task The task data to create
   */
  createTask(task: Task): void {
    this.taskService.createTask(task).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error creating task:', error);
      }
    });
  }

  /**
   * Updates an existing task using the task service
   * @param id The ID of the task to update
   * @param task The updated task data
   */
  updateTask(id: string, task: Task): void {
    this.taskService.updateTask(id, task).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error updating task:', error);
      }
    });
  }

  /**
   * Deletes a task from the system
   * @param id The ID of the task to delete
   */
  deleteTask(id: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        }
      });
    }
  }

  /**
   * Returns the appropriate color for a task's status chip
   * @param status The status of the task
   * @returns The color to be used for the status chip
   */
  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'primary';
      case 'in progress':
        return 'accent';
      case 'pending':
        return 'warn';
      default:
        return '';
    }
  }
} 