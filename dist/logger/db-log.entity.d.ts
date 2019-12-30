import { BaseEntity } from '../entities/base.entity';
import { BasicUserInfo } from '../entities/user.interface';
import { UUID, WithId } from '../types';
export declare class DbLog<T extends WithId = any> extends BaseEntity {
    action: 'update' | 'delete' | 'create' | string;
    reason?: string;
    executedBy: BasicUserInfo;
    executedById: UUID;
    initialValue: T | Record<string, any>;
    changes: any;
    entityId: UUID;
    domainId?: UUID;
    private _newValue?;
    set newValue(value: T | undefined);
    _prepare(): void;
    preventUpdate(): void;
}
