import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { BlogService, Post } from '../../services/blog';

@Component({
  selector: 'app-blog-detail',
  imports: [NgIf],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.css',
})
export class BlogDetail implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);
  blogService = inject(BlogService);

  post: Post | null = null;
  loading = false;
  error = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigateByUrl('/');
      return;
    }

    this.loading = true;
    this.blogService.getPost(id).subscribe({
      next: (post) => {
        this.post = post;
        this.loading = false;
      },
      error: () => {
        this.error = 'This post could not be loaded.';
        this.loading = false;
      }
    });
  }

  deletePost(): void {
    if (!this.post?._id) {
      return;
    }

    this.blogService.deletePost(this.post._id).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => this.error = 'You can only delete your own posts.'
    });
  }
}
