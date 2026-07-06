import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/">MEAN Blog</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item"><a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a></li>
            <li class="nav-item" *ngIf="authService.isAuthenticated()"><a class="nav-link" routerLink="/my-blogs" routerLinkActive="active">My Blogs</a></li>
            <li class="nav-item" *ngIf="authService.isAuthenticated()"><a class="nav-link" routerLink="/create" routerLinkActive="active">Create</a></li>
            <li class="nav-item" *ngIf="!authService.isAuthenticated()"><a class="nav-link" routerLink="/login" routerLinkActive="active">Login</a></li>
            <li class="nav-item" *ngIf="!authService.isAuthenticated()"><a class="nav-link" routerLink="/register" routerLinkActive="active">Register</a></li>
            <li class="nav-item" *ngIf="authService.isAuthenticated()"><button class="btn btn-outline-light btn-sm" (click)="logout()">Logout</button></li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `.navbar { padding: 0.9rem 0; }`
  ]
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
