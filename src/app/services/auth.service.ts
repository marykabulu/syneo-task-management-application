import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  public currentUser$: Observable<User | null>;
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.currentUserSubject = new BehaviorSubject<User | null>(token ? this.getUserFromToken(token) : null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  private loadCurrentUser(): Observable<User> {
    this.isLoadingSubject.next(true);
    return this.http.get<User>(`${this.apiUrl}/auth/me`).pipe(
      tap(user => this.currentUserSubject.next(user)),
      catchError(() => {
        this.logout();
        return of();
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  login(email: string, password: string): Observable<AuthResponse> {
    this.isLoadingSubject.next(true);
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next(response.user);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    this.isLoadingSubject.next(true);
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, { name, email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next(response.user);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<void> {
    this.isLoadingSubject.next(true);
    return this.http.post<void>(`${this.apiUrl}/auth/forgot-password`, { email }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  verifyCode(email: string, code: string): Observable<void> {
    this.isLoadingSubject.next(true);
    return this.http.post<void>(`${this.apiUrl}/auth/verify-code`, { email, code }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  resetPassword(email: string, code: string, password: string): Observable<void> {
    this.isLoadingSubject.next(true);
    return this.http.post<void>(`${this.apiUrl}/auth/reset-password`, { email, code, password }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  private getUserFromToken(token: string): User | null {
    // Implement the logic to parse the token and return the user object
    return null; // Placeholder return, actual implementation needed
  }
} 