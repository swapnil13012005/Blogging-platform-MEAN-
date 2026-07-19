import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';

@Component({
  selector: 'app-my-blogs-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingSpinnerComponent,
    BlogCardComponent
  ],
  template: `
    <div class="card shadow-sm border-0">
      <div class="card-body p-4 p-md-5">
        <h2 class="fw-bold mb-3">My Blogs</h2>

        <app-loading-spinner
          *ngIf="loading"
        ></app-loading-spinner>

        <div *ngIf="error" class="alert alert-danger">
          {{ error }}
        </div>

        <div
          *ngIf="!loading && posts.length === 0"
          class="alert alert-info text-center"
        >
          You have not created any blogs yet.
        </div>

        <div
          class="row g-4 mt-2"
          *ngIf="!loading && posts.length > 0"
        >
          <div
            class="col-md-6 col-xl-4"
            *ngFor="let post of posts"
          >
            <div class="d-flex flex-column h-100">
              <app-blog-card
                class="flex-grow-1 d-block"
                [post]="post"
              ></app-blog-card>

              <div class="d-flex gap-2 pt-3">
                <a
                  class="btn btn-warning btn-sm flex-fill"
                  [routerLink]="['/edit', post._id]"
                >
                  Edit
                </a>

                <button
                  type="button"
                  class="btn btn-danger btn-sm flex-fill"
                  [disabled]="deletingId === post._id"
                  (click)="deletePost(post)"
                >
                  {{
                    deletingId === post._id
                      ? 'Deleting...'
                      : 'Delete'
                  }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MyBlogsPage implements OnInit {
  private blogService = inject(BlogService);
  private cdr = inject(ChangeDetectorRef);

  posts: BlogPost[] = [];
  loading = false;
  error = '';
  deletingId = '';

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.error = '';

    this.blogService.getMyBlogs().subscribe({
      next: (posts: BlogPost[]) => {
        this.posts = posts;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Unable to load your blog posts.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  deletePost(post: BlogPost): void {
    const confirmed = window.confirm(
      `Delete "${post.title}" permanently?`
    );

    if (!confirmed) {
      return;
    }

    this.deletingId = post._id;
    this.error = '';

    this.blogService.deleteBlog(post._id).subscribe({
      next: () => {
        this.posts = this.posts.filter(
          (item: BlogPost) => item._id !== post._id
        );

        this.deletingId = '';
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.deletingId = '';
        this.error =
          err?.error?.error || 'Unable to delete this blog.';
        this.cdr.detectChanges();
      }
    });
  }
}