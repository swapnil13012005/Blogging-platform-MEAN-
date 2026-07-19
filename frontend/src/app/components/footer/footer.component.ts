import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-dark text-white py-4">
      <div class="container text-center">
        <p class="mb-0">© 2026 MEAN Blogs. Built with Angular, Express, Node.js and MongoDB.</p>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {}
