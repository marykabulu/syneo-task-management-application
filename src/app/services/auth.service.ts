import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable, of } from "rxjs"
import { delay, tap } from "rxjs/operators"
import type { MatSnackBar } from "@angular/material/snack-bar"

export interface User {
  id: string
  name: string
  email: string
}

interface UserData {
  id: string
  name: string
  email: string
  password: string
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // Dummy user data for testing
  private DUMMY_USERS: UserData[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      password: "password456",
    },
  ]

  // Dummy verification codes
  private VERIFICATION_CODES: Record<string, string> = {}

  private currentUserSubject = new BehaviorSubject<User | null>(null)
  public currentUser$ = this.currentUserSubject.asObservable()

  private isLoadingSubject = new BehaviorSubject<boolean>(false)
  public isLoading$ = this.isLoadingSubject.asObservable()

  constructor(private snackBar: MatSnackBar) {
    // Check for stored user on initialization
    const storedUser = localStorage.getItem("auth_user")
    if (storedUser) {
      try {
        this.currentUserSubject.next(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user", error)
      }
    }
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value
  }

  login(email: string, password: string): Observable<boolean> {
    this.isLoadingSubject.next(true)

    // Simulate API call delay
    return of(true).pipe(
      delay(1000),
      tap(() => {
        const foundUser = this.DUMMY_USERS.find((u) => u.email === email && u.password === password)

        if (foundUser) {
          const { password: _, ...userWithoutPassword } = foundUser
          this.currentUserSubject.next(userWithoutPassword)
          localStorage.setItem("auth_user", JSON.stringify(userWithoutPassword))
          return true
        }

        throw new Error("Invalid email or password")
      }),
      tap({
        error: () => this.isLoadingSubject.next(false),
        complete: () => this.isLoadingSubject.next(false),
      }),
    )
  }

  register(name: string, email: string, password: string): Observable<boolean> {
    this.isLoadingSubject.next(true)

    // Simulate API call delay
    return of(true).pipe(
      delay(1000),
      tap(() => {
        // Check if user already exists
        if (this.DUMMY_USERS.some((u) => u.email === email)) {
          throw new Error("Email already in use")
        }

        // Create new user
        const newUser = {
          id: String(this.DUMMY_USERS.length + 1),
          name,
          email,
          password,
        }

        // Add to dummy database
        this.DUMMY_USERS.push(newUser)

        // Log in the new user
        const { password: _, ...userWithoutPassword } = newUser
        this.currentUserSubject.next(userWithoutPassword)
        localStorage.setItem("auth_user", JSON.stringify(userWithoutPassword))

        return true
      }),
      tap({
        error: () => this.isLoadingSubject.next(false),
        complete: () => this.isLoadingSubject.next(false),
      }),
    )
  }

  logout(): void {
    this.currentUserSubject.next(null)
    localStorage.removeItem("auth_user")
  }

  requestPasswordReset(email: string): Observable<string> {
    this.isLoadingSubject.next(true)

    // Simulate API call delay
    return of(email).pipe(
      delay(1000),
      tap(() => {
        // Check if user exists
        const userExists = this.DUMMY_USERS.some((u) => u.email === email)

        if (!userExists) {
          throw new Error("Email not found")
        }

        // Generate a verification code
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        this.VERIFICATION_CODES[email] = code

        // In a real app, this would send an email
        this.snackBar.open(`Your verification code is: ${code}`, "Close", {
          duration: 10000,
        })

        return email
      }),
      tap({
        error: () => this.isLoadingSubject.next(false),
        complete: () => this.isLoadingSubject.next(false),
      }),
    )
  }

  verifyCode(email: string, code: string): Observable<boolean> {
    this.isLoadingSubject.next(true)

    // Simulate API call delay
    return of(true).pipe(
      delay(1000),
      tap(() => {
        if (this.VERIFICATION_CODES[email] !== code) {
          throw new Error("Invalid code")
        }
        return true
      }),
      tap({
        error: () => this.isLoadingSubject.next(false),
        complete: () => this.isLoadingSubject.next(false),
      }),
    )
  }

  resetPassword(email: string, password: string): Observable<boolean> {
    this.isLoadingSubject.next(true)

    // Simulate API call delay
    return of(true).pipe(
      delay(1000),
      tap(() => {
        const userIndex = this.DUMMY_USERS.findIndex((u) => u.email === email)

        if (userIndex === -1) {
          throw new Error("Email not found")
        }

        // Update password
        this.DUMMY_USERS[userIndex].password = password

        // Clear verification code
        delete this.VERIFICATION_CODES[email]

        return true
      }),
      tap({
        error: () => this.isLoadingSubject.next(false),
        complete: () => this.isLoadingSubject.next(false),
      }),
    )
  }
}

