import { IsNotEmpty, IsString, IsDecimal, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'ID del producto',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Nombre del producto',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Descripción del producto',
    type: String,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Precio del producto',
    type: 'number',
  })
  @IsDecimal()
  price: number;

  @ApiProperty({
    description: 'Stock del producto',
    type: 'number',
  })
  @IsNotEmpty()
  stock: number;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    type: String,
  })
  @IsString()
  @IsOptional()
  imgUrl?: string;
}
