import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../models/blog';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="card h-100 shadow-sm position-relative">
      <div
        *ngIf="showActions"
        class="action-buttons"
      >
        <a
          class="action-button edit-button"
          [routerLink]="['/edit', post._id]"
          title="Edit blog"
          aria-label="Edit blog"
        >
          <i class="bi bi-pencil-fill"></i>
        </a>

        <button
          type="button"
          class="action-button delete-button"
          [disabled]="deleting"
          (click)="requestDelete()"
          title="Delete blog"
          aria-label="Delete blog"
        >
          <span
            *ngIf="deleting"
            class="spinner-border spinner-border-sm"
          ></span>

          <i
            *ngIf="!deleting"
            class="bi bi-trash-fill"
          ></i>
        </button>
      </div>

      <div class="card-body">
        <h5
          class="card-title"
          [class.action-space]="showActions"
        >
          {{ post.title }}
        </h5>

        <p class="text-muted small mb-3">
          By {{ post.author }} ·
          {{ post.createdAt | date:'mediumDate' }}
        </p>

        <p class="card-text">
          {{ post.content | slice:0:160 }}
          {{ post.content.length > 160 ? '...' : '' }}
        </p>
      </div>

      <div class="card-footer bg-white border-0">
        <a
          class="btn btn-outline-primary btn-sm"
          [routerLink]="['/posts', post._id]"
        >
          Read More
        </a>
      </div>
    </article>
  `,
  styles: [`
    .action-buttons {
      position: absolute;
      top: 12px;
      right: 12px;
      display: flex;
      gap: 7px;
      z-index: 2;
    }

    .action-button {
      width: 33px;
      height: 33px;
      padding: 0;
      border: none;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-decoration: none;
      transition: transform 0.2s, opacity 0.2s;
    }

    .action-button:hover {
      color: white;
      transform: translateY(-2px);
    }

    .edit-button {
      background: #f59e0b;
    }

    .delete-button {
      background: #dc3545;
    }

    .delete-button:disabled {
      opacity: 0.65;
      transform: none;
    }

    .action-space {
      padding-right: 80px;
    }
  `]
})
export class BlogCardComponent {
  @Input({ required: true }) post!: BlogPost;
  @Input() showActions = false;
  @Input() deleting = false;

  @Output() deleteRequested = new EventEmitter<BlogPost>();

  requestDelete(): void {
    this.deleteRequested.emit(this.post);
  }
}