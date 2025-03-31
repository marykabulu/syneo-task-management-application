import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Task, CreateTaskDto, UpdateTaskDto } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    this.isLoadingSubject.next(true);
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  getTask(id: string): Observable<Task> {
    this.isLoadingSubject.next(true);
    return this.http.get<Task>(`${this.apiUrl}/tasks/${id}`).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  createTask(task: CreateTaskDto): Observable<Task> {
    this.isLoadingSubject.next(true);
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateTask(id: string, task: UpdateTaskDto): Observable<Task> {
    this.isLoadingSubject.next(true);
    return this.http.patch<Task>(`${this.apiUrl}/tasks/${id}`, task).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteTask(id: string): Observable<void> {
    this.isLoadingSubject.next(true);
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
} 