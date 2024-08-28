import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './entities/order.entity';
import { Products } from 'src/products/entities/product.entity';
import { Users } from 'src/users/entities/user.entity';
import { OrderDetails } from 'src/order-details/entities/order-detail.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  // async addOrder(orderData: any): Promise<Orders> {
  //   const user = await this.usersRepository.findOneBy({ id: orderData.userId });
  //   const products = await this.productsRepository.findByIds(
  //     orderData.products.map((p) => p.id),
  //   );

  //   // Aquí se puede calcular el total y reducir el stock
  //   // Luego se crea la orden
  //   const order = this.ordersRepository.create({ user, date: new Date() });
  //   await this.ordersRepository.save(order);

  //   // Aquí se pueden crear los detalles de la orden
  //   return order;
  // }

  // async getOrder(id: string): Promise<Orders> {
  //   return await this.ordersRepository.findOne({
  //     where: { id },
  //     relations: ['orderDetail', 'orderDetail.product'],
  //   });
  // }

  async addOrder(orderData: {
    userId: string;
    products: { id: string }[];
  }): Promise<Orders> {
    const user = await this.usersRepository.findOneBy({ id: orderData.userId });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const products = await this.productsRepository.findByIds(
      orderData.products.map((p) => p.id),
    );
    const order = this.ordersRepository.create({ user, date: new Date() });
    await this.ordersRepository.save(order);

    const orderDetails = this.orderDetailsRepository.create({
      orders: order,
      products: [],
    }); // Inicializa como un array vacío

    let totalPrice = 0;

    for (const product of products) {
      if (product.stock <= 0) {
        throw new Error(`Producto ${product.name} está fuera de stock`);
      }
      totalPrice += product.price;
      product.stock -= 1; // Descontar 1 del stock
      await this.productsRepository.save(product);
      orderDetails.products.push(product); // Agregar el producto al array
    }

    orderDetails.price = totalPrice;
    await this.orderDetailsRepository.save(orderDetails); // Guarda la instancia de orderDetails

    order.orderDetails = orderDetails;
    await this.ordersRepository.save(order);

    return order;
  }

  async getOrder(orderId: string): Promise<Orders> {
    return await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['orderDetails', 'orderDetails.products'],
    });
  }
}
