import { ObjectID } from 'typeorm';
import { UUID, WithId } from '../types';
import { IUser, BasicUserInfo } from '../entities/user.interface';
export declare class Log<T extends WithId = any> {
    _id: ObjectID;
    id: UUID;
    action: 'update' | 'delete' | 'create' | string;
    reason?: string;
    executedBy: BasicUserInfo | IUser;
    executedById: string;
    readonly executedAt: Date;
    initialValue?: T;
    changes: any;
    entityId: UUID;
    domainId?: UUID;
    private _newValue?;
    newValue: T | undefined;
    _prepare(): void;
    throwError(): void;
}
