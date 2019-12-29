import { BaseUser } from '../entities/base-user.entity';
import { UUID } from '../types';
export declare class Notification<User = BaseUser> {
    id: string;
    title: string;
    body?: string;
    user: User;
    userId: UUID;
    seenAt?: Date;
    createdAt: Date;
}
