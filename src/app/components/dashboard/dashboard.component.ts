import { Component, type OnInit } from "@angular/core"
import type { Router } from "@angular/router"
import type { AuthService, User } from "../../services/auth.service"

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  user: User | null = null
  isLoading$ = this.authService.isLoading$

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user
    })
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/"])
  }
}

