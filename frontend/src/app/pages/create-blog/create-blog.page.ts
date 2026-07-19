import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-create-blog-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card shadow-sm border-0">
      <div class="card-body p-4 p-md-5">
        <h2 class="fw-bold mb-2">Create a New Blog</h2>
        <p class="text-muted">Share your latest ideas with the community.</p>
        <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <div class="mb-3">
            <label class="form-label">Title</label>
            <input class="form-control" formControlName="title" />
          </div>
          <div class="mb-3">
            <label class="form-label">Content</label>
            <textarea class="form-control" rows="8" formControlName="content"></textarea>
          </div>
          <button class="btn btn-primary" [disabled]="loading">{{ loading ? 'Publishing...' : 'Publish' }}</button>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class CreateBlogPage {
  private fb = inject(FormBuilder);
  private blogService = inject(BlogService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  form: FormGroup = this.fb.group({
    title: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200)
      ]
    ],
    content: [
      '',
      [
        Validators.required,
        Validators.minLength(10)
      ]
    ]
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
    this.blogService.createBlog(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Could not create the post.';
        this.cdr.detectChanges();
      }
    });
  }
}
