import { BaseUserWithRoles } from '../../users/base-user-with-roles.entity';
import { CoreEntity } from '../../entities/base.entity';
import { UUID } from '../../types';
export declare class Role<User = BaseUserWithRoles> extends CoreEntity {
    user: User;
    userId: number | UUID;
    name: string;
    domain: UUID | number;
    description?: string;
}
