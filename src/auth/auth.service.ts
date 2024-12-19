import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: AuthDto){
    const { username, password } = registerDto;

    // Check if user already exists
    const existingUser  = await this.usersRepository.findOne({ where: { username } });
    if (existingUser ) {
      throw new ConflictException('Username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ username, password: hashedPassword });
    this.usersRepository.save(user);
    const payload = { username: user.username, sub: user.id };
    return {
      message: 'Register successful',
      access_token: this.signToken(payload),
    };
  }

  async login(loginDto: AuthDto){
    const { username, password } = loginDto;

    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      message: 'Login successful',
      access_token: this.signToken(payload),
    };
  }

  private signToken(payload: any): string {
    return this.jwtService.sign(payload)
  }
}