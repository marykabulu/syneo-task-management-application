import { Component, type OnInit } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"
import type { Router } from "@angular/router"
import type { MatSnackBar } from "@angular/material/snack-bar"
import type { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  isLoading$ = this.authService.isLoading$

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    })
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return
    }

    const { email, password } = this.loginForm.value

    this.authService.login(email, password).subscribe({
      next: () => {
        this.snackBar.open("You have been logged in successfully", "Close", {
          duration: 3000,
        })
        this.router.navigate(["/dashboard"])
      },
      error: (error) => {
        this.snackBar.open(error.message || "Login failed", "Close", {
          duration: 3000,
        })
      },
    })
  }
}

