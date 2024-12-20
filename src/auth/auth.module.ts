import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; 
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User ]),
    PassportModule,
    JwtModule.register({
      secret: 'AIzaSyDv7IRtei-Jw2JykFjK8BaOg-pt_CrWUmv3s',//process.env.JWT_SECRET, 
      signOptions: { expiresIn: '7d' }, 
    }),
  ],
  providers: [AuthService, JwtStrategy, UserService],
  controllers: [AuthController],
  exports: [AuthService],
})

export class AuthModule {}
