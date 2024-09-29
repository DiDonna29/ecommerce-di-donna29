import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ example: 'e01fbd27-7b23-46e7-91bd-f2b5910967c2' })
  id: string;

  @ApiProperty({ example: 'Producto Ejemplo' })
  name: string;

  @ApiProperty({ example: 'Aquí añadiras una breve descripción del producto.' })
  description: string;

  @ApiProperty({ example: 69.99 })
  price: number;

  @ApiProperty({ example: 99 })
  stock: number;

  @ApiProperty({ example: 'https://assets.soyhenry.com/LOGO-REDES-01_og.jpg' })
  imgUrl: string;
}
