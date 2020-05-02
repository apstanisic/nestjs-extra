import { FindConditions, Repository, DeleteResult } from 'typeorm';
import { BaseFindService } from './base-find.service';
import { ActivityLogMetadata } from './logger/activity-log-metadata';
import { ActivityLoggerService } from './logger/db-logger.service';
import { WithId } from './types';
export declare class BaseService<T extends WithId = any> extends BaseFindService<T> {
    constructor(repository: Repository<T>);
    protected readonly dbLoggerService?: ActivityLoggerService<T>;
    create(data: Partial<T>, meta?: ActivityLogMetadata): Promise<T>;
    update(entityOrId: T | string | number, updatedData?: Partial<T>, meta?: ActivityLogMetadata, options?: {
        usePassedEntity: boolean;
    }): Promise<T>;
    mutate(entity: T, meta?: ActivityLogMetadata): Promise<T>;
    updateWhere(where: FindConditions<T>, data: Partial<T>, meta?: ActivityLogMetadata): Promise<T>;
    delete(entityOrId: T | string, meta?: ActivityLogMetadata, options?: {
        usePassedEntity: boolean;
    }): Promise<T>;
    deleteWhere(where: FindConditions<T>, logMetadata?: ActivityLogMetadata): Promise<T>;
    deleteMany(criteria: FindConditions<T>): Promise<DeleteResult>;
}
