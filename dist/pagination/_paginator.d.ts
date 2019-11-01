import { Repository } from 'typeorm';
import { OrmWhere, WithId } from '../types';
import { PaginationParams } from './pagination-options';
import { PgResult } from './pagination.types';
export declare class Paginator<T extends WithId> {
    private readonly repo;
    private limit;
    private orderDirection;
    private orderBy;
    private cursor?;
    private direction;
    private relations;
    private currentUrl?;
    private requestQuery;
    constructor(repo: Repository<T>);
    setOptions(params: PaginationParams): Promise<void>;
    execute(filter?: OrmWhere<T>): PgResult<T>;
    private parseResponse;
}
