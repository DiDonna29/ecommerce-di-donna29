import { forwardRef, Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { CategoriesModule } from 'src/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from './entities/order-detail.entity';
import { Orders } from 'src/orders/entities/order.entity';
import { Products } from 'src/products/entities/product.entity';
import { OrderDetailsRepository } from './order-details.repository';
import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetails, Orders, Products]),
    CategoriesModule,
    ProductsModule,
    forwardRef(() => OrdersModule),
  ],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService, OrderDetailsRepository],
  exports: [OrderDetailsRepository],
})
export class OrderDetailsModule {}
