import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import {
  AiAction,
  AiService
} from '../../services/ai.service';

@Component({
  selector: 'app-create-blog-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="card shadow-sm border-0">
      <div class="card-body p-4 p-md-5">
        <h2 class="fw-bold mb-2">
          Create a New Blog
        </h2>

        <p class="text-muted">
          Share your latest ideas with the community.
        </p>

        <div
          *ngIf="error"
          class="alert alert-danger"
        >
          {{ error }}
        </div>

        <form
          [formGroup]="form"
          (ngSubmit)="submit()"
        >
          <div class="mb-3">
            <label class="form-label">
              Title
            </label>

            <input
              class="form-control"
              formControlName="title"
              placeholder="Enter blog title"
            />

            <small
              *ngIf="
                form.controls['title'].touched &&
                form.controls['title'].invalid
              "
              class="text-danger"
            >
              Title must contain between 5 and 200 characters.
            </small>
          </div>

          <div class="mb-3">
            <label class="form-label">
              Content
            </label>

            <textarea
              class="form-control"
              rows="10"
              formControlName="content"
              placeholder="Write your blog content"
            ></textarea>

            <small
              *ngIf="
                form.controls['content'].touched &&
                form.controls['content'].invalid
              "
              class="text-danger"
            >
              Content must contain at least 10 characters.
            </small>
          </div>

          <div class="d-flex flex-wrap gap-2 mb-3">
            <button
              type="button"
              class="btn btn-outline-primary"
              [disabled]="aiLoading !== null"
              (click)="useAI('suggest')"
            >
              <span
                *ngIf="aiLoading === 'suggest'"
                class="spinner-border spinner-border-sm me-1"
              ></span>

              <i
                *ngIf="aiLoading !== 'suggest'"
                class="bi bi-lightbulb me-1"
              ></i>

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
              <span
                *ngIf="aiLoading === 'correct'"
                class="spinner-border spinner-border-sm me-1"
              ></span>

              <i
                *ngIf="aiLoading !== 'correct'"
                class="bi bi-magic me-1"
              ></i>

              {{
                aiLoading === 'correct'
                  ? 'Correcting...'
                  : 'Correct Writing'
              }}
            </button>
          </div>

          <div
            *ngIf="aiSuggestions"
            class="alert alert-primary"
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
              (click)="closeSuggestions()"
            >
              Close
            </button>
          </div>

          <div
            *ngIf="previousContent"
            class="alert alert-warning d-flex flex-wrap align-items-center justify-content-between gap-2"
          >
            <span>
              <i class="bi bi-check-circle me-1"></i>
              AI correction applied.
            </span>

            <button
              type="button"
              class="btn btn-sm btn-outline-dark"
              [disabled]="aiLoading !== null"
              (click)="undoCorrection()"
            >
              <i class="bi bi-arrow-counterclockwise me-1"></i>
              Undo
            </button>
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            [disabled]="loading || aiLoading !== null"
          >
            <span
              *ngIf="loading"
              class="spinner-border spinner-border-sm me-1"
            ></span>

            {{ loading ? 'Publishing...' : 'Publish' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .suggestion-text {
      white-space: pre-wrap;
      line-height: 1.6;
    }

    textarea {
      resize: vertical;
      min-height: 220px;
    }
  `]
})
export class CreateBlogPage {
  private fb = inject(FormBuilder);
  private blogService = inject(BlogService);
  private aiService = inject(AiService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  loading = false;
  error = '';

  aiLoading: AiAction | null = null;
  aiSuggestions = '';
  previousContent = '';

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

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    this.blogService
      .createBlog(this.form.getRawValue())
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          this.loading = false;
          this.error =
            err?.error?.error ||
            'Could not create the post.';
          this.cdr.detectChanges();
        }
      });
  }

  useAI(action: AiAction): void {
    const title =
      this.form.controls['title'].value?.trim();

    const content =
      this.form.controls['content'].value?.trim();

    if (!title || title.length < 5) {
      this.error =
        'Enter a title containing at least 5 characters.';

      this.cdr.detectChanges();
      return;
    }

    if (!content || content.length < 10) {
      this.error =
        'Enter content containing at least 10 characters.';

      this.cdr.detectChanges();
      return;
    }

    this.aiLoading = action;
    this.aiSuggestions = '';
    this.error = '';

    this.aiService
      .reviewBlog(title, content, action)
      .subscribe({
        next: (response) => {
          if (action === 'correct') {
            const apply = window.confirm(
              'Apply the AI-corrected content?'
            );

            if (apply) {
              this.previousContent =
                this.form.controls['content'].value || '';

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
            err?.error?.error ||
            'AI request failed.';

          this.cdr.detectChanges();
        }
      });
  }

  undoCorrection(): void {
    if (!this.previousContent) {
      return;
    }

    const correctedContent =
      this.form.controls['content'].value || '';

    this.form.patchValue({
      content: this.previousContent
    });

    this.previousContent = '';

    this.form.controls['content'].markAsDirty();
    this.form.controls['content'].markAsTouched();

    this.cdr.detectChanges();
  }

  closeSuggestions(): void {
    this.aiSuggestions = '';
    this.cdr.detectChanges();
  }
}