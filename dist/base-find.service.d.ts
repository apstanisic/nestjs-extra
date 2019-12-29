import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository, FindManyOptions } from 'typeorm';
import { FindManyParams, FindOneParams } from './base.service';
import { PaginationParams } from './pagination/pagination-options';
import { PgResult } from './pagination/pagination.types';
import { OrmWhere, WithId } from './types';
export declare class BaseFindService<T extends WithId = any> {
    protected readonly repository: Repository<T>;
    constructor(repository: Repository<T>);
    protected logger: Logger;
    getRepository(): Repository<T>;
    findOne(filter: OrmWhere<T> | number, options?: FindOneParams<T>): Promise<T>;
    findByIds(ids: (string | number)[], searchOptions?: FindManyOptions<T>): Promise<T[]>;
    find(filter?: OrmWhere<T>, searchOptions?: FindManyParams<T>): Promise<T[]>;
    paginate(options: PaginationParams<T>, where?: OrmWhere<T>): PgResult<T>;
    count(filter: OrmWhere<T>, searchOptions?: FindManyParams<T>): Promise<number>;
    protected internalError(error: any): InternalServerErrorException;
}
