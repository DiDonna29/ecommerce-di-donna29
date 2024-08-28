import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrderRepository) {}
  async addOrder(orderData: any): Promise<any> {
    return await this.ordersRepository.addOrder(orderData);
  }

  async getOrder(id: string): Promise<any> {
    return await this.ordersRepository.getOrder(id);
  }
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
