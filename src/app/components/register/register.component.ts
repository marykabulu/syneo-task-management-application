import { Component, type OnInit } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"
import type { Router } from "@angular/router"
import type { MatSnackBar } from "@angular/material/snack-bar"
import type { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  isLoading$ = this.authService.isLoading$

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ["", Validators.required],
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
    if (this.registerForm.invalid) {
      return
    }

    const { name, email, password } = this.registerForm.value

    this.authService.register(name, email, password).subscribe({
      next: () => {
        this.snackBar.open("Your account has been created successfully", "Close", {
          duration: 3000,
        })
        this.router.navigate(["/dashboard"])
      },
      error: (error) => {
        this.snackBar.open(error.message || "Registration failed", "Close", {
          duration: 3000,
        })
      },
    })
  }
}

