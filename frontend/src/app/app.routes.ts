import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { CreateBlog } from './pages/create-blog/create-blog';
import { BlogDetail } from './pages/blog-detail/blog-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'create', component: CreateBlog },
  { path: 'posts/:id', component: BlogDetail },
  { path: '**', redirectTo: '' }
];
