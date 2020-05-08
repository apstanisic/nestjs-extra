import { InternalServerErrorException, Logger } from '@nestjs/common';
import { FindManyOptions, Repository, FindOneOptions, FindConditions, ObjectLiteral } from 'typeorm';
import { Entity } from 'aws-sdk/clients/costexplorer';
import { PaginationParams } from './pagination/pagination-options';
import { PgResult } from './pagination/pagination.types';
import { OrmWhere, WithId, ParsedOrmWhere, IdType } from './types';
export declare type FindOneParams<T> = Omit<FindOneOptions<T>, 'where'>;
export declare type FindManyParams<T> = Omit<FindManyOptions<T>, 'where'>;
declare type Where = FindConditions<Entity>[] | FindConditions<Entity> | ObjectLiteral | string | null | undefined;
export declare class BaseFindService<Entity extends WithId = any> {
    protected readonly repository: Repository<Entity>;
    constructor(repository: Repository<Entity>);
    protected logger: Logger;
    _getRepository(): Repository<Entity>;
    findOne(filter: OrmWhere<Entity> | IdType, searchOptions?: FindManyOptions<Entity>): Promise<Entity>;
    findByIds(ids: IdType[], searchOptions?: FindManyOptions<Entity>): Promise<Entity[]>;
    find(filter?: OrmWhere<Entity>, searchOptions?: FindManyOptions<Entity>): Promise<Entity[]>;
    paginate(options: PaginationParams<Entity>, where?: OrmWhere<Entity>): PgResult<Entity>;
    count(filter: OrmWhere<Entity>, searchOptions?: FindManyOptions<Entity>): Promise<number>;
    protected internalError(message: string, error?: any): InternalServerErrorException;
    protected combineWheres(where1?: Where, where2?: Where): ParsedOrmWhere<Entity>;
}
export {};
