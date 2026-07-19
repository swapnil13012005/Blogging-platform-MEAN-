import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { AiService, AiAction } from '../../services/ai.service';

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
          <div class="d-flex flex-wrap gap-2 mb-3">
            <button
              type="button"
              class="btn btn-outline-primary"
              [disabled]="aiLoading !== null"
              (click)="useAI('suggest')"
            >
              <i class="bi bi-lightbulb me-1"></i>

              {{
                aiLoading === 'suggest'
                  ? 'Generating suggestions...'
                  : 'AI Suggestions'
              }}
            </button>

            <button
              type="button"
              class="btn btn-outline-success"
              [disabled]="aiLoading !== null"
              (click)="useAI('correct')"
            >
              <i class="bi bi-magic me-1"></i>

              {{
                aiLoading === 'correct'
                  ? 'Correcting...'
                  : 'Correct Writing'
              }}
            </button>
          </div>

          <div
            *ngIf="aiSuggestions"
            class="alert alert-primary ai-suggestions"
          >
            <div class="fw-bold mb-2">
              <i class="bi bi-stars me-1"></i>
              AI Suggestions
            </div>

            <div class="suggestion-text">
              {{ aiSuggestions }}
            </div>

            <button
              type="button"
              class="btn btn-sm btn-outline-primary mt-3"
              (click)="aiSuggestions = ''"
            >
              Close
            </button>
          </div>
          <button class="btn btn-primary" [disabled]="loading">{{ loading ? 'Publishing...' : 'Publish' }}</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .suggestion-text {
      white-space: pre-wrap;
      line-height: 1.6;
    }
  `]
})
export class CreateBlogPage {
  private fb = inject(FormBuilder);
  private blogService = inject(BlogService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private aiService = inject(AiService);

  aiLoading: AiAction | null = null;
  aiSuggestions = '';

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
  useAI(action: AiAction): void {
    const title = this.form.controls['title'].value?.trim();
    const content = this.form.controls['content'].value?.trim();

    if (!title || title.length < 5) {
      this.error = 'Enter a title containing at least 5 characters.';
      this.cdr.detectChanges();
      return;
    }

    if (!content || content.length < 10) {
      this.error = 'Enter content containing at least 10 characters.';
      this.cdr.detectChanges();
      return;
    }

    this.aiLoading = action;
    this.aiSuggestions = '';
    this.error = '';

    this.aiService.reviewBlog(title, content, action).subscribe({
      next: (response) => {
        if (action === 'correct') {
          const apply = window.confirm(
            'Apply the AI-corrected content?'
          );

          if (apply) {
            this.form.patchValue({
              content: response.result
            });

            this.form.controls['content'].markAsDirty();
          }
        } else {
          this.aiSuggestions = response.result;
        }

        this.aiLoading = null;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.aiLoading = null;
        this.error =
          err?.error?.error || 'AI request failed.';
        this.cdr.detectChanges();
      }
    });
  }
}
