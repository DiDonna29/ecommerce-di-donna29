import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersRepository } from 'src/users/users.repository';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository) {}
  async signIn(email: string, password: string): Promise<string> {
    const user: Users | null = await this.userRepository.findByEmail(email);

    if (!user || user.password !== password) {
      return 'Email o Password incorrecto.';
    }

    return `Usuario ${user.email} logueado correctamente!!`;
  }
}
