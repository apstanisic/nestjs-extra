import { BaseUserWithRoles } from '../entities/base-user-with-roles.entity';
import { BaseEntity } from '../entities/base.entity';
export declare class Role<RoleType extends string = string> extends BaseEntity {
    user: BaseUserWithRoles;
    userId: string;
    name: string;
    domain: string;
    description?: string;
}
