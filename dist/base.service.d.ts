import { FindConditions, Repository, DeleteResult } from 'typeorm';
import { BaseFindService } from './base-find.service';
import { ActivityLogMetadata } from './logger/activity-log-metadata';
import { ActivityLoggerService } from './logger/db-logger.service';
import { WithId, IdType } from './types';
export declare class BaseService<Entity extends WithId = any> extends BaseFindService<Entity> {
    constructor(repository: Repository<Entity>);
    protected readonly dbLoggerService?: ActivityLoggerService<Entity>;
    create(data: Partial<Entity>, meta?: ActivityLogMetadata): Promise<Entity>;
    update(entityOrId: Entity | IdType, updatedData?: Partial<Entity>, meta?: ActivityLogMetadata, options?: {
        usePassedEntity: boolean;
    }): Promise<Entity>;
    updateWhere(where: FindConditions<Entity>, data: Partial<Entity>, meta?: ActivityLogMetadata): Promise<Entity>;
    mutate(entity: Entity, meta?: ActivityLogMetadata): Promise<Entity>;
    delete(entityOrId: Entity | IdType, meta?: ActivityLogMetadata, options?: {
        usePassedEntity: boolean;
    }): Promise<Entity>;
    deleteWhere(where: FindConditions<Entity>, logMetadata?: ActivityLogMetadata): Promise<Entity>;
    deleteMany(criteria: FindConditions<Entity>): Promise<DeleteResult>;
}
