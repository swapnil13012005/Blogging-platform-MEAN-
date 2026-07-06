import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';

@Component({
  selector: 'app-my-blogs-page',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, BlogCardComponent],
  template: `
    <div class="card shadow-sm border-0">
      <div class="card-body p-4 p-md-5">
        <h2 class="fw-bold mb-3">My Blogs</h2>
        <app-loading-spinner *ngIf="loading"></app-loading-spinner>
        <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
        <div class="row g-4 mt-2" *ngIf="!loading">
          <div class="col-md-6 col-xl-4" *ngFor="let post of posts">
            <app-blog-card [post]="post"></app-blog-card>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MyBlogsPage implements OnInit {
  private blogService = inject(BlogService);
  posts: BlogPost[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.loading = true;
    this.blogService.getBlogs().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to load your blog posts.';
        this.loading = false;
      }
    });
  }
}
