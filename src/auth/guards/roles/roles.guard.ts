import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { Role } from 'src/users/enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    console.log('request rolesguard', request);
    const user = request.payload.roles;
    console.log('user rolesguard', user);
    const hasRole = () =>
      requiredRoles.some((role) => user?.includes(role));
    console.log('hasRole', hasRole());
    console.log('requiredRoles', requiredRoles);
    console.log('user_roles', user);
    const valid = user && hasRole();
    console.log('valid rolesguard', valid);
    if (!valid)
      throw new ForbiddenException(
        'No tienes los permisos necesarios para esta solicitud.',
      );

    return valid;
  }
}
