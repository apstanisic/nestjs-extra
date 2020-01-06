import { Controller, Get, UseGuards, Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../auth/get-user.decorator';
import { BaseUser } from '../../entities/base-user.entity';
import { Role } from './roles.entity';
import { RolesService } from './roles.service';
import { ValidUUID } from '../../uuid.pipe';
import { UUID } from '../../types';

/**
 * Get roles for given user
 * User can only delete his roles. He can't create them
 */
@Controller('auth/account/roles')
export class RolesController<User extends BaseUser = BaseUser> {
  constructor(private readonly rolesService: RolesService) {}

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  getUsersRoles(@GetUser() user: User): Promise<Role[]> {
    return this.rolesService.find({ user });
  }

  /** Delete user role */
  @Delete(':roleId')
  @UseGuards(AuthGuard('jwt'))
  deleteRole(@Param('roleId', ValidUUID) id: UUID, @GetUser() user: User): Promise<Role> {
    return this.rolesService.deleteWhere({ user, id });
  }
}
