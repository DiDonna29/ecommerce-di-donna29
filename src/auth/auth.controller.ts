import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Autorización')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  async SignIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;

    if (!email || !password) {
      return 'Email y Password son requeridos.';
    }

    const user = await this.authService.signIn(email, password);
    return user;
  }

  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  async SignUp(@Body() user: CreateUserDto) {
    return await this.authService.singUp(user);
  }
}
