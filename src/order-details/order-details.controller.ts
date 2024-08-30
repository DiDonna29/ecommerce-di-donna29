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
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetails } from './entities/order-detail.entity';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrderDetail(
    @Body() orderDetailData: { orderId: string; productIds: string[] },
  ): Promise<OrderDetails> {
    return await this.orderDetailsService.createOrderDetail(orderDetailData);
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.orderDetailsService.findAll();
  }
}
