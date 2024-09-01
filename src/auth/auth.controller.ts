import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  async create(@Body() credentials: LoginUserDto): Promise<string> {
    const { email, password } = credentials;

    if (!email || !password) {
      return 'Email y Password son requeridos.';
    }

    return await this.authService.signIn(email, password);
  }
}
