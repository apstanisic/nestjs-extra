import { Role } from '../access-control/role/roles.entity';
import { BaseUser } from './base-user.entity';
export declare class BaseUserWithRoles extends BaseUser {
    roles: Role[];
}
