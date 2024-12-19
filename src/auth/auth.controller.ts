import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private userService: UserService,) {}

  @Post('register')
  async register(@Body() registerDto: AuthDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: AuthDto) {
    return this.authService.login(loginDto);
  }

}