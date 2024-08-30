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

  async addOrder(userId: string, products: any): Promise<Orders | string> {
    let total = 0;
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) return 'User not found';

    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);

    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOneBy({
          id: element.id,
        });
        if (!product) return 'Product not found';
        if (product.stock <= 0)
          return `Product ${product.name} is out of stock`;

        total += Number(product.price);
        await this.productsRepository.update(
          {
            id: element.id,
          },
          {
            stock: product.stock - 1,
          },
        );

        // console.log(product);
        // console.log(product.price);
        return product;
      }),
    );

    const orderDetail = new OrderDetails();
    orderDetail.price = Number(Number(total).toFixed(2));
    // console.log('price', orderDetail.price);
    orderDetail.products = productsArray;
    // console.log('producto', orderDetail.products);
    orderDetail.orders = newOrder;
    // console.log('orders', orderDetail.orders);

    await this.orderDetailsRepository.save(orderDetail);

    const finalOrder = await this.ordersRepository.findOne({
      where: { id: newOrder.id },
      relations: ['orderDetails'],
    });
    // console.log(finalOrder);
    return finalOrder;
  }

  async getOrder(id: string): Promise<Orders> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
    if (!order) throw new Error('Order not found');

    return order;
  }

  async getOrders() {
    const order = await this.ordersRepository.find({
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
    if (!order) throw new Error('Order not found');

    return order;
  }

  async deleteOrder(id: string): Promise<void> {
    this.ordersRepository.delete(id);
  }
}
