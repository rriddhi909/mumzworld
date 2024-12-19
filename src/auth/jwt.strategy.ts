import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'AIzaSyDv7IRtei-Jw2JykFjK8BaOg-pt_CrWUmv3s'//process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user = await this.usersRepository.findOne({ where: { username } });    
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}