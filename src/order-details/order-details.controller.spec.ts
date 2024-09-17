import { Test, TestingModule } from '@nestjs/testing';
import { OrderDetailsController } from './order-details.controller';
import { OrderDetailsService } from './order-details.service';
import { OrderDetails } from './entities/order-detail.entity';
import { Orders } from 'src/orders/entities/order.entity';

describe('OrderDetailsController', () => {
  let controller: OrderDetailsController;
  let service: OrderDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderDetailsController],
      providers: [
        {
          provide: OrderDetailsService,
          useValue: {
            createOrderDetail: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderDetailsController>(OrderDetailsController);
    service = module.get<OrderDetailsService>(OrderDetailsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order detail', async () => {
    const orderDetailData = { orderId: '1', productIds: ['1', '2'] };
    const result: OrderDetails = {
      id: '',
      price: 0,
      orders: new Orders(),
      products: [],
    };

    jest.spyOn(service, 'createOrderDetail').mockResolvedValue(result);

    expect(await controller.createOrderDetail(orderDetailData)).toBe(result);
    expect(service.createOrderDetail).toHaveBeenCalledWith(orderDetailData);
  });

  it('should return all order details', async () => {
    const result: OrderDetails[] = [
      /* ... array de OrderDetails ... */
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
    expect(service.findAll).toHaveBeenCalled();
  });
});
