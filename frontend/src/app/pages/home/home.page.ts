import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { BlogPost } from '../../models/blog';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, BlogCardComponent, LoadingSpinnerComponent],
  template: `
    <section class="hero-section bg-white rounded-4 p-4 p-md-5 shadow-sm mb-4">
      <div class="row align-items-center">
        <div class="col-lg-8">
          <h1 class="display-6 fw-bold">Welcome to MEAN Blogs</h1>
          <p class="lead text-muted">Discover stories, share ideas, and build your community.</p>
          <div class="mt-3" *ngIf="!authService.isAuthenticated()">
            <a routerLink="/register" class="btn btn-primary me-2">Create Account</a>
            <a routerLink="/login" class="btn btn-outline-secondary">Login</a>
          </div>
          <div class="mt-3" *ngIf="authService.isAuthenticated()">
            <a routerLink="/create" class="btn btn-primary">Write a Post</a>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-4">
      <h2 class="h4 fw-bold">Latest Posts</h2>
      <app-loading-spinner *ngIf="loading"></app-loading-spinner>
      <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
      
      <div *ngIf="!loading && posts.length === 0" class="alert alert-info text-center py-5">
        <i class="bi bi-inbox fs-1"></i>
        <p class="mt-3 mb-0">No posts yet. Be the first to share your thoughts!</p>
      </div>
      
      <div class="row g-4 mt-2" *ngIf="!loading && posts.length > 0">
        <div class="col-md-6 col-xl-4" *ngFor="let post of posts">
          <app-blog-card [post]="post"></app-blog-card>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class HomePage implements OnInit {
  private blogService = inject(BlogService);
  authService = inject(AuthService);

  posts: BlogPost[] = [];
  loading = false;
  error = '';
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loading = true;

    this.blogService.getBlogs().subscribe({
      next: (posts: BlogPost[]) => {
        this.posts = posts;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Unable to load posts right now.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
