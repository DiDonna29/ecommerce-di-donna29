import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/orders/entities/order.entity';
import { Products } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { OrderDetails } from './entities/order-detail.entity';

export class OrderDetailsRepository {
  constructor(
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async createOrderDetail(orderDetailData: {
    orderId: string;
    productIds: string[];
  }): Promise<OrderDetails> {
    const order = await this.ordersRepository.findOneBy({
      id: orderDetailData.orderId,
    });
    if (!order) {
      throw new Error('Orden no encontrada');
    }

    const products = await this.productsRepository.findByIds(
      orderDetailData.productIds,
    );

    const orderDetails = this.orderDetailsRepository.create({
      orders: order,
      products,
    });

    return await this.orderDetailsRepository.save(orderDetails);
  }

  async getOrder_details() {
    return await this.orderDetailsRepository.find();
  }
}
