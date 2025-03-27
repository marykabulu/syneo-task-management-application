import { Component, type OnInit } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"
import type { Router } from "@angular/router"
import type { MatSnackBar } from "@angular/material/snack-bar"
import type { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-verify-code",
  templateUrl: "./verify-code.component.html",
  styleUrls: ["./verify-code.component.css"],
})
export class VerifyCodeComponent implements OnInit {
  verifyCodeForm!: FormGroup
  isLoading$ = this.authService.isLoading$

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.verifyCodeForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      code: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    })
  }

  onSubmit(): void {
    if (this.verifyCodeForm.invalid) {
      return
    }

    const { email, code } = this.verifyCodeForm.value

    this.authService.verifyCode(email, code).subscribe({
      next: () => {
        this.snackBar.open("Code verified successfully", "Close", {
          duration: 3000,
        })
        this.router.navigate(["/reset-password"])
      },
      error: (error) => {
        this.snackBar.open(error.message || "Verification failed", "Close", {
          duration: 3000,
        })
      },
    })
  }
}

