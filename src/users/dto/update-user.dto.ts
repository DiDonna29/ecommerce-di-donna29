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
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una mayúscula, un número y un carácter especial.',
  })
  password?: string;

  @IsOptional()
  @IsNumber()
  phone?: number;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city?: string;

  @IsOptional()
  isAdmin?: boolean;
}
