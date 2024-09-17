import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let mockCategoriesService;

  beforeEach(async () => {
    mockCategoriesService = {
      addCategories: jest
        .fn()
        .mockResolvedValue('¡Categorias agregadas correctamente!'),
      getCategories: jest.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        { provide: CategoriesService, useValue: mockCategoriesService },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call addCategories from service', async () => {
    const result = await controller.addCategories();
    expect(mockCategoriesService.addCategories).toHaveBeenCalled();
    expect(result).toBe('¡Categorias agregadas correctamente!');
  });

  it('should call getCategories from service', async () => {
    const result = await controller.getCategories();
    expect(mockCategoriesService.getCategories).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
