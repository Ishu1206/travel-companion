import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

export interface WikiSummary {
  title: string;
  extract: string;
  content_urls: { desktop: { page: string } };
}

@Injectable({ providedIn: 'root' })
export class WikipediaThingsToDoService {
  private apiBase = 'https://en.wikipedia.org/w/api.php';
  private summaryBase = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

  constructor(private http: HttpClient) {}

  getThingsToDo(city: string): Observable<WikiSummary | null> {
    const queries = [
      `Tourism in ${city}`,
      `List of tourist attractions in ${city}`,
      `${city} attractions`
    ];
    // Try each query in order until one returns a valid page
    return this.tryQueries(queries);
  }

  private tryQueries(queries: string[]): Observable<WikiSummary | null> {
    if (!queries.length) return of(null);
    const title = queries[0].replace(/ /g, '_');
    return this.http.get<WikiSummary>(this.summaryBase + encodeURIComponent(title)).pipe(
      map(res => res && res.extract ? res : null),
      catchError(() => this.tryQueries(queries.slice(1)))
    );
  }
}

