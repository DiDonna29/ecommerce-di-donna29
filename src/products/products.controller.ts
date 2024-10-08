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
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/authentication/auth.guard';
import { TokenLoggerInterceptor } from 'src/token-logger-interceptor/token-logger-interceptor.interceptor';
import { Roles } from 'src/decoratos/roles/roles.decorator';
import { Role } from 'src/users/enum/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Products } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
@ApiTags('Productos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.productsService.getProducts(page, limit);
    }
    // Maneja el caso donde no se pasan `page` o `limit`
    return this.productsService.getProducts(1, 10);
  }

  @ApiBearerAuth()
  @Get('seeder')
  @HttpCode(HttpStatus.OK)
  addProducts() {
    return this.productsService.addProducts();
  }

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProduct(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(TokenLoggerInterceptor)
  updateProduct(
    @Query('id', ParseUUIDPipe) id: string,
    @Body() product: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, product);
  }
}
