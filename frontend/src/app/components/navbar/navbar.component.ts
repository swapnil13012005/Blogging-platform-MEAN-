import { Component, inject } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div class="container">
        <a
          class="navbar-brand d-flex align-items-center gap-2 fw-bold"
          routerLink="/"
          (click)="closeMenu()"
        >
          <img
            src="mean-blogs-logo.svg"
            alt="MEAN Blogs logo"
            class="brand-logo"
          />

          <span>MEAN Blogs</span>
        </a>

        <button
          class="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          [attr.aria-expanded]="menuOpen"
          aria-label="Toggle navigation"
          (click)="toggleMenu()"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse"
          [class.show]="menuOpen"
          id="navbarNav"
        >
          <ul class="navbar-nav ms-auto align-items-lg-center">
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="closeMenu()"
              >
                Home
              </a>
            </li>

            <li
              class="nav-item"
              *ngIf="authService.isAuthenticated()"
            >
              <a
                class="nav-link"
                routerLink="/my-blogs"
                routerLinkActive="active"
                (click)="closeMenu()"
              >
                My Blogs
              </a>
            </li>

            <li
              class="nav-item"
              *ngIf="authService.isAuthenticated()"
            >
              <a
                class="nav-link"
                routerLink="/create"
                routerLinkActive="active"
                (click)="closeMenu()"
              >
                Create
              </a>
            </li>

            <li
              class="nav-item"
              *ngIf="!authService.isAuthenticated()"
            >
              <a
                class="nav-link"
                routerLink="/login"
                routerLinkActive="active"
                (click)="closeMenu()"
              >
                Login
              </a>
            </li>

            <li
              class="nav-item"
              *ngIf="!authService.isAuthenticated()"
            >
              <a
                class="nav-link"
                routerLink="/register"
                routerLinkActive="active"
                (click)="closeMenu()"
              >
                Register
              </a>
            </li>

            <li
              class="nav-item ms-lg-2"
              *ngIf="authService.isAuthenticated()"
            >
              <a
                class="btn btn-outline-light btn-sm profile-button"
                routerLink="/profile"
                routerLinkActive="active"
                (click)="closeMenu()"
              >
                <i class="bi bi-person-circle me-1"></i>
                Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      padding: 0.75rem 0;
    }

    .brand-logo {
      width: 40px;
      height: 40px;
      object-fit: contain;
      border-radius: 10px;
    }

    .navbar-brand {
      font-size: 1.25rem;
      letter-spacing: 0.2px;
    }

    .profile-button.active {
      color: #0d6efd;
      background: white;
    }

    @media (max-width: 991px) {
      .navbar-collapse {
        padding-top: 0.75rem;
      }

      .nav-link {
        padding: 0.65rem 0;
      }

      .profile-button {
        display: inline-flex;
        align-items: center;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}