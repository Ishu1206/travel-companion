| Type | Name | File | Selector | DependsOn | Endpoints |
| --- | --- | --- | --- | --- | --- |
| Component | app | app.component.ts | app-root |  |  |
| Component | map | features/map/map.component.ts | app-map | map.service (service) |  |
| Component | news | features/news/news.component.ts | app-news | news.service (service) |  |
| Component | things-to-do | features/things-to-do/things-to-do.component.ts | app-things-to-do | things-to-do.service (service), wikipedia-things-to-do.service (service) |  |
| Component | weather | features/weather/weather.component.ts | app-weather | map.service (service), weather.service (service) |  |
| Component | home | pages/home/home.component.ts | app-home |  |  |
| Service | map | services/map.service.ts |  |  | GET https://nominatim.openstreetmap.org/search |
| Service | news | services/news.service.ts |  |  | GET https://newsapi.org/v2/everything |
| Service | things-to-do | services/things-to-do.service.ts |  |  | GET https://api.opentripmap.com/0.1/en/places/radius |
| Service | weather | services/weather.service.ts |  |  | GET https://api.open-meteo.com/v1/forecast |
| Service | wikipedia-things-to-do | services/wikipedia-things-to-do.service.ts |  |  | GET this.summaryBase + encodeURIComponent(title)).pipe(       map(res => res && res.extract ? res : null) |