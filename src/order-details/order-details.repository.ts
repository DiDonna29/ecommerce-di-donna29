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

    // Verificar que productIds sea un arreglo válido
    if (
      !Array.isArray(orderDetailData.productIds) ||
      !orderDetailData.productIds.length
    ) {
      throw new Error('productIds debe ser un arreglo no vacío');
    }

    const products = await this.productsRepository.findByIds(
      orderDetailData.productIds,
    );

    // Manejar la situación si no se encuentran productos
    if (products.length === 0) {
      throw new Error('No se encontraron productos');
    }

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
