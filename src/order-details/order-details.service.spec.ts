import { Test, TestingModule } from '@nestjs/testing';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsRepository } from './order-details.repository';
import { OrderDetails } from './entities/order-detail.entity';
import { Orders } from 'src/orders/entities/order.entity';

describe('OrderDetailsService', () => {
  let service: OrderDetailsService;
  let repository: OrderDetailsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderDetailsService,
        {
          provide: OrderDetailsRepository,
          useValue: {
            createOrderDetail: jest.fn(),
            getOrder_details: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrderDetailsService>(OrderDetailsService);
    repository = module.get<OrderDetailsRepository>(OrderDetailsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order detail', async () => {
    const orderDetailData = { orderId: '1', productIds: ['1', '2'] };
    const result: OrderDetails = {
      id: '',
      price: 0,
      orders: new Orders(),
      products: [],
    };

    jest.spyOn(repository, 'createOrderDetail').mockResolvedValue(result);

    expect(await service.createOrderDetail(orderDetailData)).toBe(result);
    expect(repository.createOrderDetail).toHaveBeenCalledWith(orderDetailData);
  });

  it('should return all order details', async () => {
    const result: OrderDetails[] = [];
    jest.spyOn(repository, 'getOrder_details').mockResolvedValue(result);

    expect(await service.findAll()).toBe(result);
    expect(repository.getOrder_details).toHaveBeenCalled();
  });
});
