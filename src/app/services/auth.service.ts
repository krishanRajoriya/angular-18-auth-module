import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { Login, User } from '../interface/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  constructor(private http: HttpClient, private router: Router) { }


  register(payLoad: User): Observable<User> {
    return this.http.post<User>('users/add', payLoad).pipe(
      catchError(error => {
        throw error
      })
    )
  }

  login(payLoad: Login): Observable<User> {
    return this.http.post<User>('auth/login', payLoad).pipe(
      catchError(error => {
        throw error
      })
    )
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem("user");
    this.router.navigate(['/login']); 
  }
  

  getAllUsers(): Observable<User> {
    {
      return this.http.get<User>('users').pipe(
        catchError(error => {
          throw error
        })
      )
    }
  }
}
