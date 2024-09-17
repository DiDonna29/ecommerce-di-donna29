import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { Users } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let mockUsersRepository: Partial<UsersRepository>;

  beforeEach(async () => {
    mockUsersRepository = {
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
      createUser: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
      remove: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    const users = await service.findAll();
    expect(users).toEqual([]);
    expect(mockUsersRepository.findAll).toHaveBeenCalled();
  });

  it('should throw an error if user not found', async () => {
    await expect(service.findOne('invalid-id')).rejects.toThrow(
      'Usuario con ID invalid-id no encontrado',
    );
    expect(mockUsersRepository.findOne).toHaveBeenCalledWith('invalid-id');
  });
});
