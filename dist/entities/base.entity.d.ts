import { WithId } from '../types';
export declare abstract class BaseEntity implements WithId {
    constructor(id?: string);
    readonly id: string;
    updatedAt: Date;
    createdAt: Date;
    validate(): Promise<void>;
}
