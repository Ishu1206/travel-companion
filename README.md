# travel-companion

POC: Angular Travel Companion app using Weather, Maps and News APIs. GitHub Copilot generates an architecture file mapping components to APIs. Confluence loads this file from GitHub on page view, ensuring up-to-date solution docs. Demonstrates REST integration, CI automation and documentation-as-code.

Getting started

1. Install deps: npm ci
2. Run: npm start

Notes
- Set API keys for OpenWeather and NewsAPI via environment or runtime configuration before making real requests.
- The project includes a script `scripts/generate-architecture.js` that emits `docs/architecture.json` describing components and services.

Confluence reference - https://ishantgarg12.atlassian.net/wiki/spaces/~7120203c4e763197934257b5046250fba343fb/pages/65909/Poc+github+--+confluence
