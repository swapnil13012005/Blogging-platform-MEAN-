import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { User } from '../models/user';

interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(credentials: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => this.tokenService.storeToken(response.token))
    );
  }

  register(payload: { username: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, payload).pipe(
      tap((response) => this.tokenService.storeToken(response.token))
    );
  }

  logout(): void {
    this.tokenService.removeToken();
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      if (!payload.exp || payload.exp * 1000 <= Date.now()) {
        this.tokenService.removeToken();
        return false;
      }

      return true;
    } catch {
      this.tokenService.removeToken();
      return false;
    }
  }
}
