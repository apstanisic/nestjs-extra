import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseUserWithRoles } from '../entities/base-user-with-roles.entity';
import { AccessControlService } from './access-control.service';

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
 *  @RequiredPremissions(['can_delete', 'can_update'], 'resource_id)
 *  @UseGuard(PremissionGuard)
 *  method() {}
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly acService: AccessControlService,
    private readonly reflector: Reflector = new Reflector(),
  ) {}

  /** Check if user can execute function */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const data = this.reflector.get<Metadata>(
      'access_control',
      context.getHandler(),
    );
    if (!data) return true;
    const [execute, action, resourcePath] = data;

    // const requiredPermissions = stringsToPermissions(metadataPermissions);
    const request = context.switchToHttp().getRequest();
    // Get Id from req object
    // const resourceId: string = request.params[targetName as any];

    const { user } = request as { user: BaseUserWithRoles };
    // return user.allowedTo(requiredPermissions, resourceId);
    const allowed = await this.acService.isAllowed(
      user.roles,
      resourcePath || request.path,
      action || 'write',
    );

    return allowed;
  }
}
