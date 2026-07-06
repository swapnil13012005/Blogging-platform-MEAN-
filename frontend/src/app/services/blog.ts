import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: { _id?: string; username?: string; email?: string } | string;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('/api/posts');
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`/api/posts/${id}`);
  }

  createPost(payload: { title: string; content: string }): Observable<any> {
    return this.http.post('/api/posts', payload, { headers: this.authHeaders() });
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`/api/posts/${id}`, { headers: this.authHeaders() });
  }

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}
