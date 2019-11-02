import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Request } from 'express';
import { BaseUserWithRoles } from '../entities/base-user-with-roles.entity';
import { AccessControlService } from './access-control.service';
import { RoleService } from './role/role.service';
import { AccessOptions } from './set-required-access.decorator';

/**
 * @returns permissions list that user need to have to access resource
 * @returns Resource id that user wants to access.
 *          If null, user want access to all resources.
 */
type Metadata = [boolean?, string?, string?];

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
  constructor(
    private readonly acService: AccessControlService,
    private readonly roleService: RoleService,
    private readonly reflector: Reflector = new Reflector(),
  ) {}

  /** Check if user can execute function */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accessOptions = this.reflector.get<AccessOptions | undefined>(
      'access_control',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();

    const { method } = request;
    const { user } = request.user as { user?: BaseUserWithRoles };
    // In case AuthGuard wasn't called
    if (!user) throw new InternalServerErrorException();

    const defaultAction = method === 'GET' ? 'read' : 'write';
    const action = accessOptions ? accessOptions.action : defaultAction;

    const resource =
      accessOptions && accessOptions.resource
        ? accessOptions.resource
        : request.path;

    const roles = await this.roleService.find({ userId: user.id });
    user.roles = roles;
    const allowed = await this.acService.isAllowed(roles, resource, action);

    return allowed;
  }
}
