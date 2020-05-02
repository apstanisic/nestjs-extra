import { BasicUserInfo } from '../users/user.interface';
import { WithId, IdType } from '../types';
import { BaseUser } from '../users/base-user.entity';
import { UuidEntity } from '../entities/base-uuid.entity';
export declare class ActivityLog<T extends WithId = any, User extends BaseUser = BaseUser> extends UuidEntity {
    private readonly oldValue;
    constructor(oldValue: any);
    action: 'create' | 'update' | 'delete' | string;
    entityId: IdType;
    reason?: string;
    collection: string;
    executedByInfo: BasicUserInfo;
    executedBy: User;
    executedById: IdType;
    newValue: T | Record<string, any>;
    delta: any;
    domainId?: IdType;
    _prepare(): void;
    preventUpdate(): void;
}
