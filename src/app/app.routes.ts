import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: '**', redirectTo: '' }
];
