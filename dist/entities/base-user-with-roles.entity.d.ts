import { BaseUser } from './base-user.entity';
import { Role } from '../role/roles.entity';
export declare class BaseUserWithRoles extends BaseUser {
    roles: Role[];
}
