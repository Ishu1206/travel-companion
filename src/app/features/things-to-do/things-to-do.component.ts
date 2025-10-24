import { Component, Input, OnChanges } from '@angular/core';
import { WikipediaThingsToDoService, WikiSummary } from '../../services/wikipedia-things-to-do.service';

@Component({
  selector: 'app-things-to-do',
  template: `
    <div class="card mt-3">
      <div class="card-body">
        <h5 class="card-title">Things to Do</h5>
        <div *ngIf="loading">Loading things to do...</div>
        <div *ngIf="error" class="text-danger">{{error}}</div>
        <div *ngIf="summary">
          <p>{{summary.extract}}</p>
          <a [href]="summary.content_urls.desktop.page" target="_blank">Read more on Wikipedia</a>
        </div>
        <div *ngIf="!summary && !loading && !error">No attractions found.</div>
      </div>
    </div>
  `
})
export class ThingsToDoComponent implements OnChanges {
  @Input() city = '';
  summary: WikiSummary | null = null;
  loading = false;
  error: string | null = null;

  constructor(private wiki: WikipediaThingsToDoService) {}

  ngOnChanges() {
    if (!this.city) return;
    this.fetchThings(this.city);
  }

  fetchThings(city: string) {
    this.loading = true;
    this.error = null;
    this.summary = null;
    this.wiki.getThingsToDo(city).subscribe({
      next: res => { this.summary = res; this.loading = false; },
      error: err => { this.error = 'Failed to load things to do'; this.loading = false; }
    });
  }
}
