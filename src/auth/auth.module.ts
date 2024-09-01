import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { UsersRepository } from 'src/users/users.repository';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, UsersRepository],
})
export class AuthModule {}
