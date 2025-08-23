/**
 * This file contains the AuthService, which is like a helper that handles all the user-related tasks
 * such as logging in, registering, and managing user information. Think of it as a receptionist
 * who handles all the user-related paperwork in our application.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

/**
 * This interface defines what information we store about a user.
 * Think of it as a form that lists all the information we need to know about each user.
 */
export interface User {
  id: string;        // A unique number or code that identifies this user
  email: string;     // The user's email address
  firstName: string; // The user's first name
  lastName: string;  // The user's last name
}


/**
 * This interface defines what we get back when someone successfully logs in or registers.
 * It's like a receipt that contains both the user's information and a special key (token)
 * that proves they are who they say they are.
 */
export interface AuthResponse {
  user: User;        // The user's information
  token: string;     // A special key that proves the user is authenticated
}

/**
 * The @Injectable decorator tells Angular that this is a service that can be used throughout the app.
 * Think of it as marking this file as a shared resource that different parts of the app can use.
 */
@Injectable({
  providedIn: 'root'  // This means we only need one copy of this service for the entire app
})
export class AuthService {
  // This is the address where our app talks to the server
  private apiUrl = environment.apiUrl;
  
  // This keeps track of who is currently logged in
  // Think of it as a guest list that always knows who is currently in the building
  private currentUserSubject: BehaviorSubject<User | null>;
  
  // This keeps track of whether we're currently doing something (like logging in)
  // Think of it as a "busy" sign that shows when we're processing something
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  // These are like windows that other parts of the app can look through
  // to see who is logged in or if we're busy
  public currentUser$: Observable<User | null>;
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  /**
   * The constructor is like setting up our reception desk when the app starts.
   * It checks if there's already someone logged in (by looking for a saved token)
   * and gets everything ready for handling users.
   */
  constructor(private http: HttpClient) {
    // Look for a saved login token in the browser's storage
    const token = localStorage.getItem('token');
    // Set up our guest list with either the current user or nobody
    this.currentUserSubject = new BehaviorSubject<User | null>(token ? this.getUserFromToken(token) : null);
    // Make the guest list visible to other parts of the app
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  /**
   * This method checks with the server to see who is currently logged in.
   * Think of it as calling the security desk to verify someone's identity.
   */
  private loadCurrentUser(): Observable<User> {
    // Put up the "busy" sign
    this.isLoadingSubject.next(true);
    // Ask the server who is logged in
    return this.http.get<User>(`${this.apiUrl}/auth/me`).pipe(
      // Update our guest list with the user's information
      tap(user => this.currentUserSubject.next(user)),
      // If something goes wrong, log them out
      catchError(() => {
        this.logout();
        return of();
      }),
      // Take down the "busy" sign when we're done
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  /**
   * This method checks if someone is currently logged in.
   * Think of it as checking if there's a valid ID card in our system.
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * This method handles when someone tries to log in.
   * Think of it as the receptionist checking someone's credentials and giving them an ID card.
   */
  login(email: string, password: string): Observable<AuthResponse> {
    // Put up the "busy" sign
    this.isLoadingSubject.next(true);
    // Send the login information to the server
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      // If login is successful, save their ID card and update our guest list
      tap(response => {
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next(response.user);
      }),
      // Take down the "busy" sign when we're done
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  /**
   * This method handles when someone wants to create a new account.
   * Think of it as the receptionist creating a new ID card for a new visitor.
   */
  register(name: string, email: string, password: string): Observable<AuthResponse> {
    // Put up the "busy" sign
    this.isLoadingSubject.next(true);
    
    // Split the full name into first and last name
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || ''; // Handle case where there's no last name
    
    // Send the registration information to the server
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, { 
      firstName, 
      lastName, 
      email, 
      password 
    }).pipe(
      // If registration is successful, save their ID card and update our guest list
      tap(response => {
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next(response.user);
      }),
      // Take down the "busy" sign when we're done
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  /**
   * This method handles when someone forgets their password.
   * Think of it as the receptionist helping someone get a new password.
   */
  // ... existing code ...

forgotPassword(email: string): Observable<void> {
  this.isLoadingSubject.next(true);
  return this.http.post<void>(`${this.apiUrl}/auth/forgot-password`, { email }).pipe(
    finalize(() => this.isLoadingSubject.next(false))
  );
}

// ... existing code ...

  /**
   * This method verifies a code sent to someone's email.
   * Think of it as the receptionist checking if someone has the correct verification code.
   */
  verifyCode(email: string, code: string): Observable<void> {
    // Put up the "busy" sign
    this.isLoadingSubject.next(true);
    // Send the verification code to the server
    return this.http.post<void>(`${this.apiUrl}/auth/verify-code`, { email, code }).pipe(
      // Take down the "busy" sign when we're done
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  /**
   * This method allows someone to set a new password after verifying their code.
   * Think of it as the receptionist helping someone set up a new password after verification.
   */
  // ... existing code ...

/**
 * This method allows someone to set a new password after verifying their code.
 * Think of it as the receptionist helping someone set up a new password after verification.
 */
// ... existing code ...

resetPassword(email: string, resetToken: string, newPassword: string): Observable<void> {
  this.isLoadingSubject.next(true);
  return this.http.post<void>(`${this.apiUrl}/auth/reset-password`, { 
    email, 
    resetToken, 
    newPassword 
  }).pipe(
    finalize(() => this.isLoadingSubject.next(false))
  );
}

// ... existing code ...

// ... existing code ...

  /**
   * This method handles when someone logs out.
   * Think of it as the receptionist collecting someone's ID card when they leave.
   */
  logout(): void {
    // Remove their ID card from storage
    localStorage.removeItem('token');
    // Update our guest list to show nobody is logged in
    this.currentUserSubject.next(null);
  }

  /**
   * This method converts a token into user information.
   * Think of it as the receptionist reading an ID card to get the person's details.
   */
  private getUserFromToken(token: string): User | null {
    try {
      // Check if token has JWT format (3 parts separated by dots)
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }
      
      // Decode JWT token to get user information
      const payload = JSON.parse(atob(parts[1]));
      return {
        id: payload.sub || payload.id,
        email: payload.email,
        firstName: payload.firstName || payload.first_name || '',
        lastName: payload.lastName || payload.last_name || ''
      };
    } catch (error) {
      // Token is not a valid JWT, return null
      return null;
    }
  }
} 