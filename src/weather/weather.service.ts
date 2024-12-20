import { Injectable, Inject } from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ExternalApiService } from '../external-api/external-api.service';

@Injectable()
export class WeatherService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private readonly externalApiService: ExternalApiService) {}
  
  private readonly apiKey = process.env.MAP_API_TOKEN;
  private readonly apiUrl = process.env.MAP_API_BASE_URL;

  async getCurrentWeather(city: string): Promise<any> {
    const endpoint = `weather?q=${city}&appid=${this.apiKey}`;
    try {
      const cacheKey = `weather_${city}`;
    
      // Check if the data is already cached
      const cachedData = await this.cacheManager.get(cacheKey);
      if (cachedData) {
        console.log('its from cache : ');
        return cachedData;
      }

      // If not cached, fetch from the API
      const weatherData = await this.externalApiService.fetchData('GET', endpoint).toPromise();
      console.log('its from weatherData : ');
      // Store the fetched data in cache
      await this.cacheManager.set(cacheKey, weatherData, 0);
      return weatherData;
      
    } catch (error) {
      return {
        message: 'Failed to fetch weather data or city not found',
        status: 401
      }
    }
  }

  async getForecast(city: string): Promise<any> {
    const endpoint = `forecast?q=${city}&appid=${this.apiKey}`;
    try {
      const cacheKey = `forecast_${city}`;
    
      // Check if the data is already cached
      const cachedData = await this.cacheManager.get(cacheKey);
      if (cachedData) {
        console.log('its from cache : ');
        return cachedData;
      }

      // If not cached, fetch from the API
      const forecastData = await this.externalApiService.fetchData('GET', endpoint).toPromise();
      console.log('its from forecastData : ');
      // Store the fetched data in cache
      await this.cacheManager.set(cacheKey, forecastData, 0);
      return forecastData;
      
    } catch (error) {
      return {
        message: 'Failed to fetch weather forecast data or city not found',
        status: 401
      }
    }
  }
}
