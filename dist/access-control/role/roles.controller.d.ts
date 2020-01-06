import { BaseUser } from '../../users/base-user.entity';
import { Role } from './roles.entity';
import { RolesService } from './roles.service';
import { UUID } from '../../types';
export declare class RolesController<User extends BaseUser = BaseUser> {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    getUsersRoles(user: User): Promise<Role[]>;
    deleteRole(id: UUID, user: User): Promise<Role>;
}
