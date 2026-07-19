import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-edit-blog-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent
  ],
  template: `
    <app-loading-spinner *ngIf="loadingPost"></app-loading-spinner>

    <div *ngIf="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div
      *ngIf="!loadingPost"
      class="card shadow-sm border-0"
    >
      <div class="card-body p-4 p-md-5">
        <h2 class="fw-bold mb-2">Edit Blog</h2>

        <p class="text-muted">
          Update your blog title and content.
        </p>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <div class="mb-3">
            <label class="form-label">Title</label>

            <input
              class="form-control"
              formControlName="title"
            />

            <small
              class="text-danger"
              *ngIf="
                form.controls['title'].touched &&
                form.controls['title'].invalid
              "
            >
              Title must contain between 5 and 200 characters.
            </small>
          </div>

          <div class="mb-3">
            <label class="form-label">Content</label>

            <textarea
              class="form-control"
              rows="10"
              formControlName="content"
            ></textarea>

            <small
              class="text-danger"
              *ngIf="
                form.controls['content'].touched &&
                form.controls['content'].invalid
              "
            >
              Content must contain at least 10 characters.
            </small>
          </div>

          <button
            type="submit"
            class="btn btn-primary me-2"
            [disabled]="saving"
          >
            {{ saving ? 'Updating...' : 'Update Blog' }}
          </button>

          <button
            type="button"
            class="btn btn-outline-secondary"
            [disabled]="saving"
            (click)="cancel()"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class EditBlogPage implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogService = inject(BlogService);
  private cdr = inject(ChangeDetectorRef);

  postId = '';
  loadingPost = true;
  saving = false;
  error = '';

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

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.postId) {
      this.router.navigate(['/my-blogs']);
      return;
    }

    this.blogService.getBlog(this.postId).subscribe({
      next: (post: BlogPost) => {
        this.form.patchValue({
          title: post.title,
          content: post.content
        });

        this.loadingPost = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Unable to load this blog.';
        this.loadingPost = false;
        this.cdr.detectChanges();
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.error = '';

    this.blogService
      .updateBlog(this.postId, this.form.getRawValue())
      .subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['/my-blogs']);
        },
        error: (err: any) => {
          this.saving = false;
          this.error =
            err?.error?.error || 'Unable to update this blog.';
          this.cdr.detectChanges();
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/my-blogs']);
  }
}   