import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.page')
        .then((m) => m.HomePage)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page')
        .then((m) => m.LoginPage),
    canActivate: [GuestGuard]
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page')
        .then((m) => m.RegisterPage),
    canActivate: [GuestGuard]
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/create-blog/create-blog.page')
        .then((m) => m.CreateBlogPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/edit-blog/edit-blog.page')
        .then((m) => m.EditBlogPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./pages/blog-detail/blog-detail.page')
        .then((m) => m.BlogDetailPage)
  },
  {
    path: 'my-blogs',
    loadComponent: () =>
      import('./pages/my-blogs/my-blogs.page')
        .then((m) => m.MyBlogsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.page')
        .then((m) => m.ProfilePage),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.page')
        .then((m) => m.NotFoundPage)
  }
];