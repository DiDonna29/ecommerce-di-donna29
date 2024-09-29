import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { OrderDetails } from './entities/order-detail.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Detalle de Ordenes')
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrderDetail(
    @Body() orderDetailData: CreateOrderDetailDto,
  ): Promise<OrderDetails> {
    return await this.orderDetailsService.createOrderDetail(orderDetailData);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.orderDetailsService.findAll();
  }
}
