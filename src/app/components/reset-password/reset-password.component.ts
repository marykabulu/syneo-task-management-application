import { Component, type OnInit } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"
import type { Router } from "@angular/router"
import type { MatSnackBar } from "@angular/material/snack-bar"
import type { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup
  isLoading$ = this.authService.isLoading$

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      },
      { validator: this.passwordMatchValidator },
    )
  }

  passwordMatchValidator(g: FormGroup) {
    const password = g.get("password")?.value
    const confirmPassword = g.get("confirmPassword")?.value
    return password === confirmPassword ? null : { mismatch: true }
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      return
    }

    const { email, password } = this.resetPasswordForm.value

    this.authService.resetPassword(email, password).subscribe({
      next: () => {
        this.snackBar.open("Your password has been reset successfully", "Close", {
          duration: 3000,
        })
        this.router.navigate(["/"])
      },
      error: (error) => {
        this.snackBar.open(error.message || "Password reset failed", "Close", {
          duration: 3000,
        })
      },
    })
  }
}

