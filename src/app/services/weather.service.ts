import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OpenMeteoWeatherResponse {
  latitude: number;
  longitude: number;
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
  };
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private base = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getCurrentWeather(lat: number, lon: number): Observable<OpenMeteoWeatherResponse> {
    const params = new HttpParams()
      .set('latitude', lat.toString())
      .set('longitude', lon.toString())
      .set('current_weather', 'true');
    return this.http.get<OpenMeteoWeatherResponse>(this.base, { params });
  }
}
