import { BaseEntity } from '../entities/base.entity';
import { BasicUserInfo } from '../users/user.interface';
import { UUID, WithId } from '../types';
import { BaseUser } from '../users/base-user.entity';
export declare class DbLog<T extends WithId = any, User extends BaseUser = BaseUser> extends BaseEntity {
    private readonly oldValue;
    constructor(oldValue: any);
    action: 'create' | 'update' | 'delete' | string;
    entityId: UUID | number;
    reason?: string;
    collection: string;
    executedByInfo: BasicUserInfo;
    executedBy: User;
    executedById: UUID | number;
    newValue: T | Record<string, any>;
    delta: any;
    domainId?: UUID | number;
    _prepare(): void;
    preventUpdate(): void;
}
