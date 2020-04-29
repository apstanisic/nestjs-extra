import { BaseUser } from '../users/base-user.entity';
import { UUID } from '../types';
import { BaseEntity } from '../entities/base.entity';
export declare class Notification<User = BaseUser> extends BaseEntity {
    title: string;
    body?: string;
    user: User;
    userId: UUID | number;
    seenAt?: Date;
}
