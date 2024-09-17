import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/authentication/auth.guard';
import { JwtService } from '@nestjs/jwt';

const mockProductsService = {
  getProducts: jest.fn(),
  addProducts: jest.fn(),
  getProduct: jest.fn(),
  updateProduct: jest.fn(),
};

const mockAuthGuard = {
  canActivate: jest.fn(() => true),
};

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: AuthGuard, useValue: mockAuthGuard },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
