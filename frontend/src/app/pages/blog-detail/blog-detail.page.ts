import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-blog-detail-page',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  template: `
    <app-loading-spinner *ngIf="loading"></app-loading-spinner>
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <div *ngIf="post" class="card shadow-sm border-0">
      <div class="card-body p-4 p-md-5">
        <h1 class="fw-bold mb-3">{{ post.title }}</h1>
        <p class="text-muted">By {{ post.author }} · {{ post.createdAt | date:'mediumDate' }}</p>
        <div class="lead">{{ post.content }}</div>
      </div>
    </div>
  `,
  styles: []
})
export class BlogDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogService = inject(BlogService);
  private cdr = inject(ChangeDetectorRef);

  post: BlogPost | null = null;
  loading = false;
  error = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
      return;
    }

    this.loading = true;
    this.blogService.getBlog(id).subscribe({
      next: (post: BlogPost) => {
        this.post = post;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'This post could not be found.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
