import { UuidEntity } from '../entities/base-uuid.entity';
import { IdType } from '../types';
import { BaseUser } from '../users/base-user.entity';
export declare class AuthSession<User extends BaseUser> extends UuidEntity {
    user: User;
    userId: IdType;
    email: string;
    refreshToken: string;
    location: string;
    lastUsed: Date;
    validUntil: Date;
    valid: boolean;
}
