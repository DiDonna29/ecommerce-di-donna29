import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let mockCategoryRepository;

  beforeEach(async () => {
    mockCategoryRepository = {
      find: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
      addCategories: jest
        .fn()
        .mockResolvedValue('¡Categorias agregadas correctamente!'),
      getCategories: jest.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: CategoriesRepository, useValue: mockCategoryRepository },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call addCategories from repository', async () => {
    const result = await service.addCategories();
    expect(mockCategoryRepository.addCategories).toHaveBeenCalled();
    expect(result).toBe('¡Categorias agregadas correctamente!');
  });

  it('should call getCategories from repository', async () => {
    const result = await service.getCategories();
    expect(mockCategoryRepository.getCategories).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
