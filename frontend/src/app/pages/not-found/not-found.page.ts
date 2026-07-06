import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="text-center py-5">
      <h1 class="display-1 fw-bold">404</h1>
      <p class="lead">The page you are looking for does not exist.</p>
      <a routerLink="/" class="btn btn-primary">Go Home</a>
    </div>
  `,
  styles: []
})
export class NotFoundPage {}
