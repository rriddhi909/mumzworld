import { IsString } from '@nestjs/class-validator';

export class WeatherDto {
  @IsString()
  city: string;
}