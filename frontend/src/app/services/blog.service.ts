import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BlogPost, CreateBlogPayload } from '../models/blog';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly apiUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiUrl);
  }

  getMyBlogs(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/mine`);
  }

  getBlog(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
  }

  createBlog(payload: CreateBlogPayload): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }

  updateBlog(id: string, payload: CreateBlogPayload): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }

  deleteBlog(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchBlogs(term: string): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiUrl);
  }
}