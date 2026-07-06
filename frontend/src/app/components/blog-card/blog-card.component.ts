import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../models/blog';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="card h-100 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="text-muted small mb-3">By {{ post.author }} · {{ post.createdAt | date:'mediumDate' }}</p>
        <p class="card-text">{{ post.content | slice:0:160 }}{{ post.content.length > 160 ? '...' : '' }}</p>
      </div>
      <div class="card-footer bg-white border-0">
        <a class="btn btn-outline-primary btn-sm" [routerLink]="['/posts', post._id]">Read More</a>
      </div>
    </article>
  `,
  styles: []
})
export class BlogCardComponent {
  @Input() post!: BlogPost;
}
