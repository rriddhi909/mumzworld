import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { FavouriteLocationService } from './favourite-location.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FavouriteLocation } from './favourite-location.entity';

@Controller('locations')
@UseGuards(JwtAuthGuard)
export class FavouriteLocationController {
  constructor(private readonly favouriteLocationService: FavouriteLocationService) {}

  @Get()
  async getAllFavouriteLocations(@Request() req): Promise<FavouriteLocation[]> {
    return this.favouriteLocationService.getAllFavouriteLocations(req.user);
  }

  @Post()
  async addFavouriteLocation(@Body('city') city: string, @Request() req): Promise<FavouriteLocation> {
    return this.favouriteLocationService.addFavouriteLocation(city, req.user);
  }

  @Delete(':id')
  async deleteFavouriteLocation(@Param('id') id: number, @Request() req): Promise<void> {
    return this.favouriteLocationService.deleteFavouriteLocation(id, req.user);
  }
}