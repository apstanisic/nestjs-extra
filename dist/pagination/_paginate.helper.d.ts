import { Repository } from 'typeorm';
import { PgResult } from './pagination.types';
import { PaginationParams } from './pagination-options';
import { WithId } from '../types';
interface Params<T> {
    repository: Repository<T>;
    options: PaginationParams<T>;
}
export declare function paginate<T extends WithId>({ repository, options }: Params<T>): PgResult<T>;
export {};
