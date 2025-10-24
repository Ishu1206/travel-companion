import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NewsArticle { title: string; url: string; description?: string; }
export interface NewsResponse { status: string; totalResults: number; articles: NewsArticle[] }

@Injectable({ providedIn: 'root' })
export class NewsService {
  // TODO: Set your NewsAPI key below
  // Get one at https://newsapi.org/
  private apiKey = '563f19b3bdf742a2998682c75e492efb';

  private base = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) {}

  getNewsForCity(city: string): Observable<NewsResponse> {
    const params = new HttpParams()
      .set('q', city)
      .set('apiKey', this.apiKey || '');
    return this.http.get<NewsResponse>(`${this.base}/everything`, { params });
  }
}
