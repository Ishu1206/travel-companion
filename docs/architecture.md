| Type | Name | File | Selector | DependsOn | Endpoints |
| --- | --- | --- | --- | --- | --- |
| Component | app | app.component.ts | app-root |  |  |
| Component | map | features/map/map.component.ts | app-map | map.service (service) |  |
| Component | news | features/news/news.component.ts | app-news | news.service (service) |  |
| Component | weather | features/weather/weather.component.ts | app-weather | map.service (service), weather.service (service) |  |
| Component | home | pages/home/home.component.ts | app-home |  |  |
| Service | map | services/map.service.ts |  |  | GET https://nominatim.openstreetmap.org/search |
| Service | news | services/news.service.ts |  |  | GET https://newsapi.org/v2/everything |
| Service | weather | services/weather.service.ts |  |  | GET https://api.open-meteo.com/v1/forecast |