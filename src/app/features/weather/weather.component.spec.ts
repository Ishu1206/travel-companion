// Basic smoke test placeholder
import { WeatherComponent } from './weather.component';

describe('WeatherComponent', () => {
  it('creates', () => {
    const comp = new WeatherComponent({} as any);
    expect(comp).toBeTruthy();
  });
});

