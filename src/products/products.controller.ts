import {
  Controller,
  Get,
  Body,
  Param,
  Query,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.productsService.getProducts(page, limit);
    }
    // Maneja el caso donde no se pasan `page` o `limit`
    return this.productsService.getProducts(1, 10);
  }

  @Get('seeder')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  addProducts() {
    return this.productsService.addProducts();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProduct(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  updateProduct(@Query('id', ParseUUIDPipe) id: string, @Body() product: any) {
    return this.productsService.updateProduct(id, product);
  }
}
