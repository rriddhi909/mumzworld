import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class FavouriteLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @ManyToOne(() => User, (user) => user.favouriteLocations)
  user: User; 
}