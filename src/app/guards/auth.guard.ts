import { Injectable } from "@angular/core"
import type { CanActivate, Router } from "@angular/router"
import type { Observable } from "rxjs"
import { map, take } from "rxjs/operators"
import type { AuthService } from "../services/auth.service"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      take(1),
      map((user) => {
        if (user) {
          return true
        } else {
          this.router.navigate(["/"])
          return false
        }
      }),
    )
  }
}

