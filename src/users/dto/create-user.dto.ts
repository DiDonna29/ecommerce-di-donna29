import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description:
      'El nombre de usuario es obligatorio y debe tener entre 3 y 80 caracteres.',
    example: 'JuanPerez',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @ApiProperty({
    description:
      'El email único es obligatorio y debe ser un correo electrónico válido.',
    example: 'juan.perez@example.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description:
      'La contraseña debe tener entre 8 y 15 caracteres y contener al menos una letra minúscula, una mayúscula, un número y un carácter especial.',
    example: 'Contraseña123!',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una mayúscula, un número y un carácter especial.',
  })
  password: string;

  @ApiProperty({
    description:
      'Confirma la contraseña ingresada. Debe ser igual a la contraseña.',
    example: 'Contraseña123!',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty({
    description:
      'La dirección es obligatoria y debe tener entre 3 y 80 caracteres.',
    example: 'Calle Falsa 123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @ApiProperty({
    description: 'El número de teléfono es obligatorio y debe ser un número.',
    example: 123456789,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @ApiProperty({
    description: 'El país es obligatorio y debe tener entre 5 y 20 caracteres.',
    example: 'Argentina',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @ApiProperty({
    description:
      'La ciudad es obligatoria y debe tener entre 5 y 20 caracteres.',
    example: 'Buenos Aires',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  @ApiProperty({
    description:
      'Indica si el usuario tiene privilegios de administrador. Opcional.',
    example: true,
    required: false,
  })
  @IsOptional()
  isAdmin?: boolean;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
