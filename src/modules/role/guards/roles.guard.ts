import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BackendLogger } from 'modules/logger/BackendLogger';
import { User } from 'modules/user/schemas/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new BackendLogger(RolesGuard.name);

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    this.logger.debug(`Verifying access to roles: ${roles}`);

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    const hasRole = () =>
      user.roles.some(
        role =>
          !!roles.find(
            item =>
              item.toLowerCase() === role.name.toLowerCase() && role.enabled,
          ),
      );

    return user && user.roles && hasRole();
  }
}
