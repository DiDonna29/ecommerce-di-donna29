import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from 'src/products/entities/product.entity';
import { ProductDto } from './product.dto';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID del usuario que realiza el pedido. Debe ser un UUID.',
    example: 'd3b5e1c5-9a5b-4c9b-bd29-1e6d5f6e8f2e',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description:
      'Lista de productos en el pedido. Debe contener al menos un producto.',
    type: [ProductDto],
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  products: ProductDto[];
}
