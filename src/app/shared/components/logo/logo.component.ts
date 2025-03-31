import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <div class="logo-container">
      <img src="assets/logo.png" alt="Logo" class="logo">
    </div>
  `,
  styles: [`
    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2rem;
    }
    .logo {
      max-width: 150px;
      height: auto;
    }
  `]
})
export class LogoComponent {} 