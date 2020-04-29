import { BaseUserWithRoles } from '../../users/base-user-with-roles.entity';
import { BaseEntity } from '../../entities/base.entity';
import { UUID } from '../../types';
export declare class Role<User = BaseUserWithRoles> extends BaseEntity {
    user: User;
    userId: number | UUID;
    name: string;
    domain: UUID | number;
    description?: string;
}
