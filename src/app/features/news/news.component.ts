import { Component, Input, OnChanges } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">News</h5>
        <div *ngIf="loading">Loading news...</div>
        <div *ngIf="error" class="text-danger">{{error}}</div>
        <ul *ngIf="articles?.length">
          <li *ngFor="let a of articles"><a [href]="a.url" target="_blank">{{a.title}}</a></li>
        </ul>
        <div *ngIf="!articles?.length && !loading">No news found.</div>
      </div>
    </div>
  `
})
export class NewsComponent implements OnChanges {
  @Input() city = '';
  articles: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private news: NewsService) {}

  ngOnChanges() {
    if (!this.city) return;
    this.fetchNews(this.city);
  }

  fetchNews(city: string) {
    this.loading = true;
    this.error = null;
    this.news.getNewsForCity(city).subscribe({
      next: res => { this.articles = res.articles || []; this.loading = false; },
      error: err => { this.error = 'Failed to load news'; this.loading = false; }
    });
  }
}

