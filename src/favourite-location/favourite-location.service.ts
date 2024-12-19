import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavouriteLocation } from './favourite-location.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class FavouriteLocationService {
  constructor(
    @InjectRepository(FavouriteLocation)
    private favouriteLocationRepository: Repository<FavouriteLocation>,
  ) {}

  async getAllFavouriteLocations(user: User): Promise<FavouriteLocation[]> {
    return this.favouriteLocationRepository.find({ where: { user } });
  }

  async addFavouriteLocation(city: string, user: User): Promise<FavouriteLocation> {    
    // Check if the location already exists for the user
    const existingLocation = await this.favouriteLocationRepository.findOne({
      where: { city: city, user },
    });

    if (existingLocation) {
      throw new ConflictException('This city is already in your favourites.');
    }

    // If it doesn't exist, create and save the new favourite location
    const favouriteLocation = this.favouriteLocationRepository.create({ city, user });
    return this.favouriteLocationRepository.save(favouriteLocation);
  }

  async deleteFavouriteLocation(locationId: number, user: User): Promise<void> {
    // Check if user has permission to delete location from favourites list
    const location = await this.favouriteLocationRepository.findOne({ where: { id: locationId, user } });
    if (!location) {
      throw new NotFoundException('Location not found.');
    }
    await this.favouriteLocationRepository.delete(locationId);
  }
}