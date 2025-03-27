import { Component, type OnInit } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"
import type { Router } from "@angular/router"
import type { MatSnackBar } from "@angular/material/snack-bar"
import type { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup
  isLoading$ = this.authService.isLoading$

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    })
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return
    }

    const { email } = this.forgotPasswordForm.value

    this.authService.requestPasswordReset(email).subscribe({
      next: () => {
        this.snackBar.open("A verification code has been sent to your email", "Close", {
          duration: 3000,
        })
        this.router.navigate(["/verify-code"])
      },
      error: (error) => {
        this.snackBar.open(error.message || "Request failed", "Close", {
          duration: 3000,
        })
      },
    })
  }
}

