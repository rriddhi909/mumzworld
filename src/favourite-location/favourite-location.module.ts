import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouriteLocationService } from './favourite-location.service';
import { FavouriteLocationController } from './favourite-location.controller';
import { FavouriteLocation } from './favourite-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavouriteLocation])],
  providers: [FavouriteLocationService],
  controllers: [FavouriteLocationController],
})
export class FavouriteLocationModule {}