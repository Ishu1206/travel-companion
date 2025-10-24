import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { WeatherComponent } from './features/weather/weather.component';
import { NewsComponent } from './features/news/news.component';
import { MapComponent } from './features/map/map.component';
import { ThingsToDoComponent } from './features/things-to-do/things-to-do.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeatherComponent,
    NewsComponent,
    MapComponent,
    ThingsToDoComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
