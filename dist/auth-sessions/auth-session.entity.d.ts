import { UuidEntity } from '../entities/base-uuid.entity';
import { IdType } from '../types';
import { BaseUser } from '../users/base-user.entity';
export declare class AuthSession<User extends BaseUser> extends UuidEntity {
    user: User;
    userId: IdType;
    name: string;
    email: string;
    refreshToken: string;
    ip: string;
    browser?: string;
    os?: string;
    lastUsed: Date;
    validUntil: Date;
    valid: boolean;
}
