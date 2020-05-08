import { WithId, IdType } from '../types';
export declare abstract class CoreEntity implements WithId {
    id: IdType;
    updatedAt: Date;
    createdAt: Date;
    validate(): Promise<void>;
}
