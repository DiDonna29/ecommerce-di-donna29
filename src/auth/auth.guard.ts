import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    // console.log('authHeader', authHeader);

    if (!authHeader)
      throw new UnauthorizedException('El header de autorizacion no existe.');

    const base64Credentials = authHeader.split(' ')[1];
    // console.log('base64Credentials', base64Credentials);
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'utf-8',
    );
    // console.log('credentials', credentials);
    const [email, password] = credentials.split(':');

    // console.log('email', email);
    // console.log('password', password);

    if (!email || !password)
      throw new UnauthorizedException('Credencial no valida.');

    return true;
  }
}
