import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { ToastService } from '../../shared/components/ui/toast/toast.service';
import { ToastContainerComponent } from '../../shared/components/ui/toast/toast-container.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ButtonComponent,
    ToastContainerComponent
  ],
  template: `
    <div class="dashboard-container">
      <app-card class="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <p>Here's an overview of your tasks and activities</p>
      </app-card>

      <div class="dashboard-grid">
        <app-card class="dashboard-card">
          <h2>Recent Tasks</h2>
          <p>No tasks yet</p>
        </app-card>

        <app-card class="dashboard-card">
          <h2>Statistics</h2>
          <p>No statistics available</p>
        </app-card>

        <app-card class="dashboard-card">
          <h2>Notifications</h2>
          <p>No new notifications</p>
        </app-card>
      </div>

      <div class="dashboard-actions">
        <app-button
          variant="primary"
          (onClick)="createNewTask()">
          Create New Task
        </app-button>
      </div>
    </div>
    <app-toast-container></app-toast-container>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 24px;
      text-align: center;
    }

    .dashboard-header h1 {
      font-size: 28px;
      color: #1a1a1a;
      margin-bottom: 8px;
    }

    .dashboard-header p {
      color: #666;
      font-size: 16px;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
    }

    .dashboard-card {
      padding: 20px;
    }

    .dashboard-card h2 {
      font-size: 20px;
      color: #1a1a1a;
      margin-bottom: 16px;
    }

    .dashboard-card p {
      color: #666;
      font-size: 14px;
    }

    .dashboard-actions {
      display: flex;
      justify-content: center;
      margin-top: 24px;
    }
  `]
})
export class DashboardComponent {
  constructor(private toastService: ToastService) {}

  createNewTask() {
    this.toastService.info('New task creation coming soon!');
  }
} 