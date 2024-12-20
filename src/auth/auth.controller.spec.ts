// src/auth/auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from './user.service'; // Import the missing service

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
          },
        },
        {
          provide: UserService, // Mock the UserService
          useValue: {
            findUserByUsername: jest.fn(), // Example mock method
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return access token and success message on valid credentials', async () => {
      const mockLoginDto = { username: 'RIDDHI@yopmail.com', password: 'RIDDHI' };
      const mockResponse = {
        access_token: 'mockAccessToken',
        message: 'Login successful',
      };

      jest.spyOn(authService, 'login').mockResolvedValue(mockResponse);

      expect(await authController.login(mockLoginDto)).toEqual(mockResponse);
      expect(authService.login).toHaveBeenCalledWith(mockLoginDto);
    });

    it('should throw an error for invalid credentials', async () => {
      const mockLoginDto = { username: 'invalidUser', password: 'invalidPassword' };
      jest.spyOn(authService, 'login').mockRejectedValue(new Error('Invalid credentials'));

      await expect(authController.login(mockLoginDto)).rejects.toThrow('Invalid credentials');
      expect(authService.login).toHaveBeenCalledWith(mockLoginDto);
    });
  });

  describe('register', () => {
    it('should return access token and success message on registration', async () => {
      const mockRegisterDto = { username: 'newUser@yopmail.com', password: 'newPassword' };
      const mockResponse = {
        access_token: 'mockAccessToken',
        message: 'Registration successful',
      };

      jest.spyOn(authService, 'register').mockResolvedValue(mockResponse);

      expect(await authController.register(mockRegisterDto)).toEqual(mockResponse);
      expect(authService.register).toHaveBeenCalledWith(mockRegisterDto);
    });
  });
});
