import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './orders.repository';
import { Products } from 'src/products/entities/product.entity';
import { Orders } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrderRepository) {}
  async addOrder(
    userId: string,
    products: { id: string }[],
  ): Promise<Orders | string> {
    return this.ordersRepository.addOrder(userId, products);
  }

  async getOrders(): Promise<any> {
    return await this.ordersRepository.getOrders();
  }

  async getOrder(id: string): Promise<any> {
    return await this.ordersRepository.getOrder(id);
  }
  async remove(id: string): Promise<void> {
    return this.ordersRepository.deleteOrder(id);
  }
}
