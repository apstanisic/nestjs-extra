import { BaseUserWithRoles } from '../../users/base-user-with-roles.entity';
import { BaseEntity } from '../../entities/base.entity';
export declare class Role<User = BaseUserWithRoles> extends BaseEntity {
    user: User;
    userId: string;
    name: string;
    domain: string;
    description?: string;
}
