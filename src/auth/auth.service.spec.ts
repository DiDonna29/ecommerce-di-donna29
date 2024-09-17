import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersRepository: Partial<UsersRepository>;
  let mockJwtService: Partial<JwtService>;

  beforeEach(async () => {
    mockUsersRepository = {
      findByEmail: jest.fn(),
      createUser: jest.fn(),
    };

    mockJwtService = {
      sign: jest.fn().mockReturnValue('token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sign in a user', async () => {
    const user = {
      id: '1',
      email: 'test@example.com',
      password: 'hashedPassword',
    };
    mockUsersRepository.findByEmail = jest.fn().mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

    const result = await service.signIn('test@example.com', 'password');

    expect(result).toEqual({
      token: 'token',
      message: 'Usuario test@example.com logueado correctamente!!',
    });
    expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(
      'test@example.com',
    );
  });

  it('should throw an error if user not found', async () => {
    mockUsersRepository.findByEmail = jest.fn().mockResolvedValue(null);

    await expect(
      service.signIn('test@example.com', 'password'),
    ).rejects.toThrow(BadRequestException);
  });
});
