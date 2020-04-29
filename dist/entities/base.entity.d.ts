import { WithId } from '../types';
export declare abstract class BaseEntity implements WithId {
    constructor(id?: string | number);
    readonly id: string | number;
    updatedAt: Date;
    createdAt: Date;
    validate(): Promise<void>;
}
