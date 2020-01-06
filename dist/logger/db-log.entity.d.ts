import { BaseEntity } from '../entities/base.entity';
import { BasicUserInfo } from '../entities/user.interface';
import { UUID, WithId } from '../types';
import { BaseUser } from '../entities/base-user.entity';
export declare class DbLog<T extends WithId = any, User extends BaseUser = BaseUser> extends BaseEntity {
    action: 'create' | 'update' | 'delete' | string;
    reason?: string;
    executedByInfo: BasicUserInfo;
    executedBy: User;
    executedById: UUID;
    oldValue: T | Record<string, any>;
    changes: any;
    entityId: UUID;
    domainId?: UUID;
    private _newValue?;
    set newValue(value: T | undefined);
    _prepare(): void;
    preventUpdate(): void;
}
