import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      signIn: jest.fn(),
      singUp: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should sign in a user', async () => {
    const loginDto: LoginUserDto = {
      email: 'test@example.com',
      password: 'password',
    };
    mockAuthService.signIn = jest.fn().mockResolvedValue({
      token: 'token',
      message: 'Usuario test@example.com logueado correctamente!!',
    });

    const result = await controller.SignIn(loginDto);

    expect(result).toEqual({
      token: 'token',
      message: 'Usuario test@example.com logueado correctamente!!',
    });
  });

  it('should sign up a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      confirmPassword: 'password',
      address: '123 Test St',
      phone: 1234567890,
      country: 'Testland',
      city: 'Test City',
    };

    mockAuthService.singUp = jest.fn().mockResolvedValue({
      email: 'test@example.com',
    });

    const result = await controller.SignUp(createUserDto);

    expect(result).toEqual({ email: 'test@example.com' });
  });
});
