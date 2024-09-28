import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description:
      'El nombre de usuario debe tener entre 3 y 80 caracteres. Opcional.',
    example: 'JuanPerez',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name?: string;

  @ApiProperty({
    description: 'El email debe ser un correo electrónico válido. Opcional.',
    example: 'juan.perez@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description:
      'La contraseña debe tener entre 8 y 15 caracteres y contener al menos una letra minúscula, una mayúscula, un número y un carácter especial. Opcional.',
    example: 'Contraseña123!',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una mayúscula, un número y un carácter especial.',
  })
  password?: string;

  @ApiProperty({
    description: 'El número de teléfono debe ser un número. Opcional.',
    example: 123456789,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  phone?: number;

  @ApiProperty({
    description: 'El país debe tener entre 5 y 20 caracteres. Opcional.',
    example: 'Argentina',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country?: string;

  @ApiProperty({
    description: 'La dirección debe tener entre 3 y 80 caracteres. Opcional.',
    example: 'Calle Falsa 123',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address?: string;

  @ApiProperty({
    description: 'La ciudad debe tener entre 5 y 20 caracteres. Opcional.',
    example: 'Buenos Aires',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city?: string;

  @ApiProperty({
    description:
      'Indica si el usuario tiene privilegios de administrador. Opcional.',
    example: true,
    required: false,
  })
  @IsOptional()
  isAdmin?: boolean;
}
