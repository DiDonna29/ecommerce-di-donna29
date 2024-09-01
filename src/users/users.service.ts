import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUser: CreateUserDto): Promise<Users | string> {
    return await this.usersRepository.createUser(createUser);
  }

  async findAll(page: number = 1, limit: number = 5): Promise<Users[]> {
    return this.usersRepository.findAll(page, limit);
  }

  async findOne(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async findOneWithOrders(id: string): Promise<Users> {
    const user = await this.usersRepository.findOneWithOrders(id);
    if (!user) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.remove(id);
  }
}
