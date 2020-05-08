import { UuidEntity } from '../entities/base-uuid.entity';
import { IdType } from '../types';
import { BaseUser } from '../users/base-user.entity';
export declare class Notification<User = BaseUser> extends UuidEntity {
    title: string;
    body?: string;
    user: User;
    userId: IdType;
    seenAt?: Date;
}
