import { Component, Input, OnChanges } from '@angular/core';
import { WeatherService, OpenMeteoWeatherResponse } from '../../services/weather.service';
import { MapService, Location } from '../../services/map.service';

@Component({
  selector: 'app-weather',
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Weather</h5>
        <div *ngIf="loading">Loading weather...</div>
        <div *ngIf="error" class="text-danger">{{error}}</div>
        <div *ngIf="data">
          <p><strong>{{city}}</strong></p>
          <p>Temp: {{data.current_weather.temperature}} °C</p>
          <p>Windspeed: {{data.current_weather.windspeed}} km/h</p>
          <p>Wind direction: {{data.current_weather.winddirection}}°</p>
          <p>Time: {{data.current_weather.time}}</p>
        </div>
      </div>
    </div>
  `
})
export class WeatherComponent implements OnChanges {
  @Input() city = '';
  data: OpenMeteoWeatherResponse | null = null;
  loading = false;
  error: string | null = null;

  constructor(private weather: WeatherService, private map: MapService) {}

  ngOnChanges() {
    if (!this.city) return;
    this.fetchWeather(this.city);
  }

  fetchWeather(city: string) {
    this.loading = true;
    this.error = null;
    this.data = null;
    // Use MapService to get coordinates for the city
    this.map.getLocationForCity(city).subscribe({
      next: (loc: Location) => {
        this.weather.getCurrentWeather(loc.lat, loc.lon).subscribe({
          next: res => { this.data = res; this.loading = false; },
          error: err => { this.error = 'Failed to load weather'; this.loading = false; }
        });
      },
      error: err => { this.error = 'Failed to find city location'; this.loading = false; }
    });
  }
}
