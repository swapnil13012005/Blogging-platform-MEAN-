import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type AiAction = 'suggest' | 'correct';

interface AiResponse {
  result: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private readonly apiUrl = `${environment.apiUrl}/ai`;

  constructor(private http: HttpClient) {}

  reviewBlog(
    title: string,
    content: string,
    action: AiAction
  ): Observable<AiResponse> {
    return this.http.post<AiResponse>(
      `${this.apiUrl}/review`,
      {
        title,
        content,
        action
      }
    );
  }
}