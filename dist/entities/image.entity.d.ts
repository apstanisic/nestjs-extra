import { UuidEntity } from './base-uuid.entity';
export declare class Image extends UuidEntity {
    original?: string;
    prefix: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
}
