import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"
import { HttpClientModule } from "@angular/common/http"

import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSnackBarModule } from "@angular/material/snack-bar"

import { AppComponent } from "./app.component"
import { LoginComponent } from "./components/login/login.component"
import { RegisterComponent } from "./components/register/register.component"
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component"
import { VerifyCodeComponent } from "./components/verify-code/verify-code.component"
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component"
import { DashboardComponent } from "./components/dashboard/dashboard.component"
import { AuthGuard } from "./guards/auth.guard"
import { LogoComponent } from "./components/logo/logo.component"

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyCodeComponent,
    ResetPasswordComponent,
    DashboardComponent,
    LogoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterModule.forRoot([
      { path: "", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "forgot-password", component: ForgotPasswordComponent },
      { path: "verify-code", component: VerifyCodeComponent },
      { path: "reset-password", component: ResetPasswordComponent },
      { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
      { path: "**", redirectTo: "" },
    ]),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

