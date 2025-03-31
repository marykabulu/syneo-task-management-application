import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="logo">
      <img src="assets/logo.png" alt="Syneo Logo" class="logo-image">
    </div>
  `,
  styles: [`
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .logo-image {
      width: 120px;
      height: auto;
    }
  `]
})
export class LogoComponent {}
