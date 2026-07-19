import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card shadow-sm border-0">
      <div class="card-body p-4 p-md-5">
        <h2 class="fw-bold mb-3">Profile</h2>
        <div *ngIf="user" class="mt-3">
          <p><strong>Username:</strong> {{ user.username }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProfilePage implements OnInit {
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  user: User | null = null;

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (user: User) => {
        this.user = user;
        this.cdr.detectChanges();
      },
      error: () => {
        console.error('Unable to load profile');
        this.cdr.detectChanges();
      }
    });
  }
}
