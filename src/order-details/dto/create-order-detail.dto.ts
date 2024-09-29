import { IsArray, IsNotEmpty, IsString, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

export class CreateOrderDetailDto {
  @ApiProperty({
    description: 'ID de la orden a la que se asociará el detalle',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({
    description: 'Lista de productos asociados al detalle de la orden',
    type: [CreateProductDto],
  })
  @IsArray()
  @IsNotEmpty({ each: true })
  products: CreateProductDto[];

  @ApiProperty({
    description: 'Precio total del detalle de la orden',
    type: 'number',
    example: 79.98,
  })
  @IsDecimal()
  price: number;
}
