import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="card p-3">
      <form (submit)="onSearch($event)" class="row g-2">
        <div class="col-md-8">
          <input [(ngModel)]="city" name="city" class="form-control" placeholder="Enter a city (e.g., London)" />
        </div>
        <div class="col-md-4 d-flex">
          <button class="btn btn-primary me-2" (click)="search()" type="button">Search</button>
          <button class="btn btn-secondary" (click)="clear()" type="button">Clear</button>
        </div>
      </form>

      <div class="mt-3">
        <div *ngIf="error" class="alert alert-danger">{{error}}</div>
        <div *ngIf="loading" class="text-center my-3">Loading...</div>

        <div *ngIf="cityQuery">
          <div class="row">
            <div class="col-md-4">
              <app-weather [city]="cityQuery"></app-weather>
              <app-things-to-do [city]="cityQuery"></app-things-to-do>
            </div>
            <div class="col-md-4">
              <app-news [city]="cityQuery"></app-news>
            </div>
            <div class="col-md-4">
              <app-map [city]="cityQuery"></app-map>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {
  city = '';
  cityQuery = '';
  loading = false;
  error: string | null = null;

  search() {
    if (!this.city || !this.city.trim()) {
      this.error = 'Please enter a city name.';
      return;
    }
    this.error = null;
    this.loading = true;
    setTimeout(() => {
      this.cityQuery = this.city.trim();
      this.loading = false;
    }, 300);
  }

  clear() {
    this.city = '';
    this.cityQuery = '';
    this.error = null;
  }

  onSearch(e: Event) { e.preventDefault(); this.search(); }
}
