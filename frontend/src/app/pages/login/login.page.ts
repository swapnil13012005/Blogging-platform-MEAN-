import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="row justify-content-center">
      <div class="col-lg-5 col-md-7">
        <div class="card shadow-sm border-0">
          <div class="card-body p-4 p-md-5">
            <h2 class="fw-bold mb-2">Login</h2>
            <p class="text-muted">Welcome back! Sign in to continue.</p>
            <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
            <form [formGroup]="form" (ngSubmit)="submit()">
              <div class="mb-3">
                <label class="form-label">Username</label>
                <input class="form-control" formControlName="username" />
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" formControlName="password" />
              </div>
              <button class="btn btn-primary w-100" [disabled]="loading">{{ loading ? 'Signing in...' : 'Login' }}</button>
            </form>
            <p class="mt-3 mb-0 text-center">
              New here? <a routerLink="/register">Create an account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  loading = false;
  error = '';

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Invalid username or password.';
      }
    });
  }
}
