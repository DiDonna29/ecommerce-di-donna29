import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(page: number = 1, limit: number = 5): Promise<Users[]> {
    const users = await this.usersRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    return users;
  }

  async findOne(id: string): Promise<Partial<Users>> {
    const newUser = await this.usersRepository.findOneBy({ id });
    if (!newUser) throw new BadRequestException('No existe este usuario!');
    const { password, isAdmin, ...userWithOutPassword } = newUser;
    return userWithOutPassword;
  }

  async findByEmail(email: string): Promise<Partial<Users | null>> {
    const newUser = await this.usersRepository.findOneBy({ email });
    if (!newUser) return null;
    return newUser;
  }

  async findOneWithOrders(id: string): Promise<Users> {
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
  }

  async createUser(User: Partial<Users>): Promise<Partial<Users | string>> {
    const existingUser = await this.usersRepository.findOneBy({
      email: User.email,
    });

    if (existingUser) {
      return 'Este usuario ya se encuentra registrado. Por favor, usa otro correo.';
    }

    const newUser = await this.usersRepository.save(User);
    if (!newUser) throw new BadRequestException('No existe este usuario!');
    // const { password, isAdmin, ...userWithOutPassword } = newUser;
    return this.omitSensitiveData(newUser);
  }

  async update(
    id: string,
    updateUser: Partial<Users>,
  ): Promise<Partial<Users>> {
    await this.usersRepository.update(id, updateUser);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
  private omitSensitiveData(user: Users): Partial<Users> {
    const { password, isAdmin, ...userWithoutSensitiveData } = user;
    return userWithoutSensitiveData;
  }
}
