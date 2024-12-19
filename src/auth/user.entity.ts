import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FavouriteLocation } from '../favourite-location/favourite-location.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => FavouriteLocation, (favouriteLocation) => favouriteLocation.user)
  favouriteLocations: FavouriteLocation[];
}