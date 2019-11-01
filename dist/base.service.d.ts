import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Validator } from 'class-validator';
import { FindConditions, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { BaseFindService } from './base-find.service';
import { DbLoggerService } from './logger/db-logger.service';
import { LogMetadata } from './logger/log-metadata';
import { WithId } from './types';
export declare type FindOneParams<T> = Omit<FindOneOptions<T>, 'where'>;
export declare type FindManyParams<T> = Omit<FindManyOptions<T>, 'where'>;
export declare class BaseService<T extends WithId = any> extends BaseFindService<T> {
    protected readonly dbLoggerService?: DbLoggerService<T> | undefined;
    constructor(repository: Repository<T>, dbLoggerService?: DbLoggerService<T> | undefined);
    protected logger: Logger;
    protected validator: Validator;
    create(data: Partial<T>, meta?: LogMetadata): Promise<T>;
    update(entityOrId: T | string, updatedData?: Partial<T>, meta?: LogMetadata): Promise<T>;
    mutate(entity: T, meta?: LogMetadata): Promise<T>;
    updateWhere(where: FindConditions<T>, data: Partial<T>, meta?: LogMetadata): Promise<T>;
    delete(entityOrId: T | string, meta?: LogMetadata): Promise<T>;
    deleteWhere(where: FindConditions<T>, logMetadata?: LogMetadata): Promise<T>;
    protected internalError(error: any): InternalServerErrorException;
}
