import { Component, Input, OnChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Map</h5>
        <div *ngIf="loading">Loading map...</div>
        <div *ngIf="error" class="text-danger">{{error}}</div>
        <div #mapContainer style="height:200px; width:100%"></div>
      </div>
    </div>
  `
})
export class MapComponent implements OnChanges, AfterViewInit {
  @Input() city = '';
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;

  loading = false;
  error: string | null = null;

  constructor(private map: MapService) {}

  ngAfterViewInit() {
    // placeholder
  }

  ngOnChanges() {
    if (!this.city) return;
    this.loading = true;
    this.error = null;
    this.map.getLocationForCity(this.city).subscribe({
      next: loc => {
        this.loading = false;
        this.map.renderMap(this.mapContainer?.nativeElement, loc);
      },
      error: err => { this.error = 'Failed to load map data'; this.loading = false; }
    });
  }
}

