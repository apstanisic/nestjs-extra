import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Validator } from 'class-validator';
import { FindConditions, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { BaseFindService } from './base-find.service';
import { DbLoggerService } from './logger/db-logger.service';
import { DbLogMetadata } from './logger/db-log-metadata';
import { WithId } from './types';
export declare type FindOneParams<T> = Omit<FindOneOptions<T>, 'where'>;
export declare type FindManyParams<T> = Omit<FindManyOptions<T>, 'where'>;
export declare class BaseService<T extends WithId = any> extends BaseFindService<T> {
    constructor(repository: Repository<T>);
    protected readonly dbLoggerService?: DbLoggerService<T>;
    protected logger: Logger;
    protected validator: Validator;
    create(data: Partial<T>, meta?: DbLogMetadata): Promise<T>;
    update(entityOrId: T | string, updatedData?: Partial<T>, meta?: DbLogMetadata, usePassedEntity?: boolean): Promise<T>;
    mutate(entity: T, meta?: DbLogMetadata): Promise<T>;
    updateWhere(where: FindConditions<T>, data: Partial<T>, meta?: DbLogMetadata): Promise<T>;
    delete(entityOrId: T | string, meta?: DbLogMetadata, usePassedEntity?: boolean): Promise<T>;
    deleteWhere(where: FindConditions<T>, logMetadata?: DbLogMetadata): Promise<T>;
    protected internalError(error: any): InternalServerErrorException;
}
