import { WithId } from '../types';
export declare abstract class CoreEntity implements WithId {
    id: string | number;
    updatedAt: Date;
    createdAt: Date;
    validate(): Promise<void>;
}
