import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from './entities/order.entity';
import { Products } from 'src/products/entities/product.entity';
import { Users } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './orders.repository';
import { OrderDetailsModule } from 'src/order-details/order-details.module';
import { OrderDetailsRepository } from 'src/order-details/order-details.repository';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { OrderDetails } from 'src/order-details/entities/order-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, Products, Users, OrderDetails]),
    OrderDetailsModule,
    UsersModule,
    forwardRef(() => ProductsModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
  exports: [OrderRepository],
})
export class OrdersModule {}
