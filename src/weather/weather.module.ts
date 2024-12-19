import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weather } from './weather.entity';
import { ExternalApiModule } from 'src/external-api/external-api.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 0,
      max: 100,
    }),
    TypeOrmModule.forFeature([Weather]), 
    ExternalApiModule
  ],
  providers: [WeatherService],
  controllers: [WeatherController],
  exports: [WeatherService],
})
export class WeatherModule {}