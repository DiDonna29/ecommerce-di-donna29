import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { GloballoggerMiddleware } from './middleware/globallogger/globallogger.middleware';

@Module({
  imports: [UsersModule, AuthModule, ProductsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GloballoggerMiddleware).forRoutes('*');
  }
}
