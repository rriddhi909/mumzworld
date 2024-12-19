// src/auth/auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should register a user and return an access token', async () => {
      const user = { username: 'testuser@yopmail.com', password: 'testpass' };
      const accessToken = 'mock-access-token'; // Mock token
      jest.spyOn(authService, 'register').mockResolvedValue({ message: 'Register successful', access_token: accessToken });

      expect(await authController.register(user)).toEqual({ access_token: accessToken });
      expect(authService.register).toHaveBeenCalledWith(user.username, user.password);
    });
  });

  describe('login', () => {
    it('should login a user and return an access token', async () => {
      const user = { username: 'testuser@yopmail.com', password: 'testpass' };
      const accessToken = 'mock-access-token'; // Mock token
      jest.spyOn(authService, 'login').mockResolvedValue({ message: 'Login successful', access_token: accessToken });

      expect(await authController.login(user)).toEqual({ access_token: accessToken });
      expect(authService.login).toHaveBeenCalledWith(user.username, user.password);
    });

    it('should throw an error for invalid credentials', async () => {
      const user = { username: 'wronguser', password: 'wrongpass' };
      jest.spyOn(authService, 'login').mockRejectedValue(new Error('Invalid credentials'));

      await expect(authController.login(user)).rejects.toThrow('Invalid credentials');
      expect(authService.login).toHaveBeenCalledWith(user.username, user.password);
    });
  });
});