import { BaseUserWithRoles } from '../../users/base-user-with-roles.entity';
import { UUID } from '../../types';
import { Role } from './roles.entity';
export declare function generateRole(users: BaseUserWithRoles[], domain?: UUID[]): Role;
export declare function generateUserRole(user: BaseUserWithRoles): Role;
