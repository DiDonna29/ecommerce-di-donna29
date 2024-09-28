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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/order.entity';
import { AuthGuard } from 'src/auth/guards/authentication/auth.guard';
import { TokenLoggerInterceptor } from 'src/token-logger-interceptor/token-logger-interceptor.interceptor';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Ordenes')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @UseInterceptors(TokenLoggerInterceptor)
  async addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    return await this.ordersService.addOrder(userId, products);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UseInterceptors(TokenLoggerInterceptor)
  async getOrder(@Param('id') id: string) {
    return await this.ordersService.getOrder(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UseInterceptors(TokenLoggerInterceptor)
  async getOrders() {
    return await this.ordersService.getOrders();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UseInterceptors(TokenLoggerInterceptor)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
