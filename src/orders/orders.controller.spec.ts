import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtModule } from '@nestjs/jwt';
import { Categories } from 'src/categories/entities/categories.entity';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'test-secret', // Cambia esto por tu secreto real
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            addOrder: jest.fn(),
            getOrder: jest.fn(),
            getOrders: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add an order', async () => {
    const orderDto: CreateOrderDto = {
      userId: '1',
      products: [
        {
          id: '1',
          name: 'Product 1',
          description: 'Description of Product 1',
          price: 100,
          stock: 10,
          imgUrl: 'http://example.com/image.jpg',
          orderDetails: [],
          category: {
            id: '2',
            name: 'Category 1',
            products: [],
          },
        },
      ],
    };
    jest.spyOn(service, 'addOrder').mockResolvedValue(undefined);

    await expect(controller.addOrder(orderDto)).resolves.toBeUndefined();
    expect(service.addOrder).toHaveBeenCalledWith(
      orderDto.userId,
      orderDto.products,
    );
  });

  it('should get an order', async () => {
    const orderId = '1';
    const order = { id: '1', userId: '1', products: [] };
    jest.spyOn(service, 'getOrder').mockResolvedValue(order);

    await expect(controller.getOrder(orderId)).resolves.toEqual(order);
    expect(service.getOrder).toHaveBeenCalledWith(orderId);
  });

  it('should get all orders', async () => {
    const orders = [{ id: '1', userId: '1', products: [] }];
    jest.spyOn(service, 'getOrders').mockResolvedValue(orders);

    await expect(controller.getOrders()).resolves.toEqual(orders);
    expect(service.getOrders).toHaveBeenCalled();
  });

  it('should remove an order', async () => {
    const orderId = '1';
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    await expect(controller.remove(orderId)).resolves.toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(orderId);
  });
});
