import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  IsUrl,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description:
      'El nombre del producto debe tener entre 3 y 50 caracteres. Opcional.',
    example: 'ProductoEjemplo',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name?: string;

  @ApiProperty({
    description:
      'La descripción del producto debe tener entre 3 y 100 caracteres. Opcional.',
    example: 'Descripción del producto.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description?: string;

  @ApiProperty({
    description:
      'El precio del producto debe ser un número positivo. Opcional.',
    example: 19.99,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiProperty({
    description: 'El stock del producto debe ser un número positivo. Opcional.',
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  stock?: number;

  @ApiProperty({
    description:
      'La URL de la imagen del producto debe ser una URL válida. Opcional.',
    example: 'https://example.com/producto.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  imgUrl?: string;
}
