import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Location { lat: number; lon: number; }

@Injectable({ providedIn: 'root' })
export class MapService {
  // Using OpenStreetMap Nominatim for geocoding (no API key required for low-volume)
  private nominatim = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  getLocationForCity(city: string): Observable<Location> {
    const params = new HttpParams()
      .set('q', city)
      .set('format', 'json')
      .set('limit', '1');
    return this.http.get<any[]>(this.nominatim, { params }).pipe(
      map(results => {
        const r = results && results[0];
        if (!r) throw new Error('Location not found');
        return { lat: parseFloat(r.lat), lon: parseFloat(r.lon) } as Location;
      })
    );
  }

  renderMap(container: HTMLElement, loc: Location) {
    // lightweight rendering: add a static OpenStreetMap iframe
    container.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.style.border = '0';
    iframe.style.width = '100%';
    iframe.style.height = '200px';
    iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${loc.lon-0.05}%2C${loc.lat-0.05}%2C${loc.lon+0.05}%2C${loc.lat+0.05}&layer=mapnik&marker=${loc.lat}%2C${loc.lon}`;
    container.appendChild(iframe);
  }
}

