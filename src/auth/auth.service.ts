import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersRepository } from 'src/users/users.repository';
import { Users } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  async signIn(
    email: string,
    password: string,
  ): Promise<{ token: string; message: string }> {
    if (!email || !password)
      throw new BadRequestException('Email o password son requeridos');

    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new BadRequestException('Usuario no encontrado');
    if (!user.password) {
      throw new BadRequestException(
        'Contraseña no encontrada para el usuario.',
      );
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new BadRequestException('Credencial no valida!.');

    const userPayload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const token = this.jwtService.sign(userPayload);

    return {
      token,
      message: `Usuario ${user.email} logueado correctamente!!`,
    };
  }

  async singUp(user: CreateUserDto) {
    const foundUser = await this.userRepository.findByEmail(user.email);
    if (foundUser) throw new BadRequestException('El usuario ya existe');

    if (user.password !== user.confirmPassword)
      throw new BadRequestException('Las contraseñas no coinciden');

    const hashedPassword = await bcrypt.hash(user.password, 10);

    if (!hashedPassword)
      throw new BadRequestException('Hubo un error al hashear el password');

    await this.userRepository.createUser({
      ...user,
      password: hashedPassword,
    });

    const { password, confirmPassword, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
