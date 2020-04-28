import { InternalServerErrorException, Logger } from '@nestjs/common';
import { FindManyOptions, Repository, FindOneOptions, FindConditions, ObjectLiteral } from 'typeorm';
import { Entity } from 'aws-sdk/clients/costexplorer';
import { PaginationParams } from './pagination/pagination-options';
import { PgResult } from './pagination/pagination.types';
import { OrmWhere, WithId, ParsedOrmWhere } from './types';
export declare type FindOneParams<T> = Omit<FindOneOptions<T>, 'where'>;
export declare type FindManyParams<T> = Omit<FindManyOptions<T>, 'where'>;
declare type Where = FindConditions<Entity>[] | FindConditions<Entity> | ObjectLiteral | string;
export declare class BaseFindService<T extends WithId = any> {
    protected readonly repository: Repository<T>;
    constructor(repository: Repository<T>);
    protected logger: Logger;
    _getRepository(): Repository<T>;
    findOne(filter: OrmWhere<T> | number, searchOptions?: FindManyOptions<T>): Promise<T>;
    findByIds(ids: (string | number)[], searchOptions?: FindManyOptions<T>): Promise<T[]>;
    find(filter?: OrmWhere<T>, searchOptions?: FindManyOptions<T>): Promise<T[]>;
    paginate(options: PaginationParams<T>, where?: OrmWhere<T>): PgResult<T>;
    count(filter: OrmWhere<T>, searchOptions?: FindManyOptions<T>): Promise<number>;
    protected internalError(message: string, error?: any): InternalServerErrorException;
    protected combineWheres(where1?: Where, where2?: Where): ParsedOrmWhere<T>;
}
export {};
