import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { AuthGuard } from 'src/auth/guards/authentication/auth.guard';
import { TokenLoggerInterceptor } from 'src/token-logger-interceptor/token-logger-interceptor.interceptor';
import { Roles } from 'src/decoratos/roles/roles.decorator';
import { Role } from './enum/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //! POST cambiado para auth como SignUp
  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // create(@Body() createUser: CreateUserDto) {
  //   return this.usersService.create(createUser);
  // }

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(TokenLoggerInterceptor)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UseInterceptors(TokenLoggerInterceptor)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @Get('/orders/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UseInterceptors(TokenLoggerInterceptor)
  findOneWithOrders(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneWithOrders(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UseInterceptors(TokenLoggerInterceptor)
  async update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return await this.usersService.update(id, updateUser);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UseInterceptors(TokenLoggerInterceptor)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
