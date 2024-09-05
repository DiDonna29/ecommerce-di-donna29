import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) throw new BadRequestException('No hay Token proporcionado!.');

    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });
      payload.exp = new Date(payload.exp * 1000);
      payload.iat = new Date(payload.iat * 1000);
      request.payload = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token no valido.');
    }
  }
}

// const authHeader = request.headers.authorization;
// // console.log('authHeader', authHeader);
// if (!authHeader)
//   throw new UnauthorizedException('El header de autorizacion no existe.');

// const base64Credentials = authHeader.split(' ')[1];
// // console.log('base64Credentials', base64Credentials);
// const credentials = Buffer.from(base64Credentials, 'base64').toString(
//   'utf-8',
// );
// // console.log('credentials', credentials);
// const [email, password] = credentials.split(':');

// // console.log('email', email);
// // console.log('password', password);

// if (!email || !password)
//   throw new UnauthorizedException('Credencial no valida.');
