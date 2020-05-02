import { Repository } from 'typeorm';
import { BaseFindService } from '../base-find.service';
import { WithId } from '../types';
import { ActivityLogMetadata } from './activity-log-metadata';
import { ActivityLog } from './activity-log.entity';
interface GenerateLogParams<T> {
    oldValue?: T;
    meta: ActivityLogMetadata;
}
export declare class ActivityLoggerService<Entity extends WithId = any> extends BaseFindService<ActivityLog> {
    constructor(repository: Repository<ActivityLog>);
    generateLog({ oldValue, meta }: GenerateLogParams<Entity>): ActivityLog<Entity>;
    store(log: ActivityLog, action: string, newValue?: Entity): Promise<ActivityLog>;
}
export {};
