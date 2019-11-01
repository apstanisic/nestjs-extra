export declare abstract class BaseEntity {
    constructor(id?: string);
    readonly id: string;
    updatedAt: Date;
    createdAt: Date;
    validate(): Promise<void>;
}
