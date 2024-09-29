import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetailsRepository } from './order-details.repository';
import { OrderDetails } from './entities/order-detail.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    private readonly orderDetailsRepository: OrderDetailsRepository,
  ) {}

  async createOrderDetail(
    orderDetailData: CreateOrderDetailDto,
  ): Promise<OrderDetails> {
    const { orderId, products } = orderDetailData;
    const productIds = products.map((product) => product.id);

    return await this.orderDetailsRepository.createOrderDetail({
      orderId,
      productIds,
    });
  }

  create(createOrderDetailDto: CreateOrderDetailDto) {
    return 'This action adds a new orderDetail';
  }

  async findAll() {
    return await this.orderDetailsRepository.getOrder_details();
  }

  findOne(id: number) {
    return `This action returns a #${id} orderDetail`;
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
