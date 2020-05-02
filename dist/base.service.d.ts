import { FindConditions, Repository, DeleteResult } from 'typeorm';
import { BaseFindService } from './base-find.service';
import { DbLogMetadata } from './logger/db-log-metadata';
import { DbLoggerService } from './logger/db-logger.service';
import { WithId } from './types';
export declare class BaseService<T extends WithId = any> extends BaseFindService<T> {
    constructor(repository: Repository<T>);
    protected readonly dbLoggerService?: DbLoggerService<T>;
    create(data: Partial<T>, meta?: DbLogMetadata): Promise<T>;
    update(entityOrId: T | string | number, updatedData?: Partial<T>, meta?: DbLogMetadata, options?: {
        usePassedEntity: boolean;
    }): Promise<T>;
    mutate(entity: T, meta?: DbLogMetadata): Promise<T>;
    updateWhere(where: FindConditions<T>, data: Partial<T>, meta?: DbLogMetadata): Promise<T>;
    delete(entityOrId: T | string, meta?: DbLogMetadata, options?: {
        usePassedEntity: boolean;
    }): Promise<T>;
    deleteWhere(where: FindConditions<T>, logMetadata?: DbLogMetadata): Promise<T>;
    deleteMany(criteria: FindConditions<T>): Promise<DeleteResult>;
}
