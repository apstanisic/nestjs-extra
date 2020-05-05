import { BaseUserWithRoles } from '../../users/base-user-with-roles.entity';
import { IdType } from '../../types';
import { UuidEntity } from '../../entities/base-uuid.entity';
export declare class Role<User = BaseUserWithRoles> extends UuidEntity {
    user: User;
    userId: IdType;
    name: string;
    domain: IdType;
    description?: string;
}
