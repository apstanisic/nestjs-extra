import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Request } from 'express';
import { BaseUserWithRoles } from '../users/base-user-with-roles.entity';
import { AccessControlService } from './access-control.service';
import { RolesService } from './role/roles.service';
import { AccessResourceOptions } from './set-required-access.decorator';

/**
 * Protect routes from access if user does not have required permissions
 * This is little hacky because we can't have DI here.
 * If there is and this is global then this is exec before AuthGuard
 * @example
 *  @RequiredPermissions(['can_delete', 'can_update'], 'resource_id)
 *  @UseGuard(PermissionGuard)
 *  method() {}
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  /** Used to access matadata from decorators */
  private readonly reflector: Reflector = new Reflector();
  private readonly logger = new Logger(PermissionsGuard.name);

  constructor(
    private readonly acService: AccessControlService,
    private readonly roleService: RolesService,
  ) {}

  /**
   * Check if user can execute function
   * @Todo see if I can cache fetching roles for at least 30 seconds
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accessOptions = this.reflector.get<AccessResourceOptions | undefined>(
      'access_control',
      context.getHandler(),
    );

    const request = context
      .switchToHttp()
      .getRequest<{ user?: BaseUserWithRoles; method: string; path: string }>();
    const { method, user, path } = request;

    // In case AuthGuard wasn't called
    if (!user) {
      this.logger.error('User not available in PermissionsGuard');
      throw new ForbiddenException();
    }

    const lcMethod = `${method}`.toLowerCase();
    let defaultRestAction = 'create';
    if (lcMethod === 'get') defaultRestAction = 'read';
    if (lcMethod === 'put' || lcMethod === 'patch') defaultRestAction = 'update';
    if (lcMethod === 'delete') defaultRestAction = 'delete';

    const action = accessOptions?.action ?? defaultRestAction;
    const resource = accessOptions?.resource ?? path;

    // Check role caching
    const roles = await this.roleService.find({ userId: user.id });
    user.roles = roles;
    const isAllowed = await this.acService.isAllowed(roles, resource, action);

    return isAllowed;
  }
}
