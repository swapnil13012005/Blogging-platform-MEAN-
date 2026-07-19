import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingSpinnerComponent
  ],
  template: `
    <app-loading-spinner
      *ngIf="loading"
    ></app-loading-spinner>

    <div
      *ngIf="error"
      class="alert alert-danger"
    >
      {{ error }}
    </div>

    <div
      *ngIf="!loading && user"
      class="row justify-content-center"
    >
      <div class="col-md-8 col-lg-6">
        <div class="card shadow-sm border-0">
          <div class="card-body p-4 p-md-5 text-center">
            <div class="profile-avatar mx-auto mb-3">
              <i class="bi bi-person-fill"></i>
            </div>

            <h2 class="fw-bold mb-1">
              {{ user.username }}
            </h2>

            <p class="text-muted mb-4">
              MEAN Blogs member
            </p>

            <div class="profile-info text-start">
              <div class="info-row">
                <div class="info-icon">
                  <i class="bi bi-person"></i>
                </div>

                <div>
                  <small class="text-muted d-block">
                    Username
                  </small>

                  <strong>{{ user.username }}</strong>
                </div>
              </div>

              <div class="info-row">
                <div class="info-icon">
                  <i class="bi bi-envelope"></i>
                </div>

                <div>
                  <small class="text-muted d-block">
                    Email
                  </small>

                  <strong>{{ user.email }}</strong>
                </div>
              </div>
            </div>

            <div class="d-flex flex-wrap justify-content-center gap-2 mt-4">
              <a
                routerLink="/my-blogs"
                class="btn btn-primary"
              >
                <i class="bi bi-journal-text me-1"></i>
                My Blogs
              </a>

              <button
                type="button"
                class="btn btn-outline-danger"
                (click)="logout()"
              >
                <i class="bi bi-box-arrow-right me-1"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-avatar {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2.8rem;
      background: linear-gradient(
        135deg,
        #7c3aed,
        #2563eb
      );
      box-shadow: 0 10px 25px rgba(37, 99, 235, 0.25);
    }

    .profile-info {
      border: 1px solid #e5e7eb;
      border-radius: 1rem;
      overflow: hidden;
    }

    .info-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
    }

    .info-row + .info-row {
      border-top: 1px solid #e5e7eb;
    }

    .info-icon {
      width: 42px;
      height: 42px;
      flex-shrink: 0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2563eb;
      background: #eff6ff;
      font-size: 1.2rem;
    }
  `]
})
export class ProfilePage implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  user: User | null = null;
  loading = true;
  error = '';

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (user: User) => {
        this.user = user;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.error = 'Unable to load your profile.';
        this.cdr.detectChanges();
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}