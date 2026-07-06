import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog';

@Component({
  selector: 'app-create-blog',
  imports: [FormsModule, NgIf],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.css',
})
export class CreateBlog {
  blogService = inject(BlogService);
  router = inject(Router);

  form = { title: '', content: '' };
  error = '';
  loading = false;

  submit(): void {
    this.loading = true;
    this.error = '';
    this.blogService.createPost(this.form).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.error || 'Could not create the post.';
      }
    });
  }
}
