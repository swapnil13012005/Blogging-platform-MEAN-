import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly storageKey = 'mean_blog_token';

  storeToken(token: string): void {
    localStorage.setItem(this.storageKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.storageKey);
  }
}
