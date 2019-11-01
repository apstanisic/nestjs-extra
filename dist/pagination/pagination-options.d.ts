import { OrmWhere, Struct } from '../types';
export declare class PaginationParams<T = any> {
    static fromRequest<T>(queryOrBody?: Struct): PaginationParams<T>;
    limit?: number;
    cursor?: string;
    order?: 'ASC' | 'DESC';
    currentUrl?: string;
    where?: OrmWhere<T>;
    relations: string[];
}
