import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    return await this.ordersService.addOrder(userId, products);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOrder(@Param('id') id: string) {
    return await this.ordersService.getOrder(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getOrders() {
    return await this.ordersService.getOrders();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
