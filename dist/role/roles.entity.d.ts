import { BaseEntity } from '../entities/base.entity';
export declare class Role extends BaseEntity {
    userId: string;
    name: string;
    domain: string;
    description?: string;
}
