import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class TokenLoggerInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (token) {
      // Decodificar el token
      const decoded = this.jwtService.decode(token) as {
        id: string;
        email: string;
        exp: number;
      };

      if (decoded) {
        const userId = decoded.id; // ID del usuario
        const userEmail = decoded.email; // Email del usuario
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        const timeRemaining = decoded.exp - currentTime; // Tiempo restante en segundos

        console.log(
          `Usuario ID: ${userId}, Email: ${userEmail}, Tiempo restante del TOKEN: ${timeRemaining / 60} minutos`,
        );
      } else {
        console.log('Token no válido o no se pudo decodificar.');
      }
    } else {
      console.log('No se proporcionó token.');
    }

    return next.handle();
  }
}
