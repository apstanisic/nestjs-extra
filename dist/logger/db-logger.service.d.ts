import { Repository } from 'typeorm';
import { BaseFindService } from '../base-find.service';
import { WithId } from '../types';
import { DbLogMetadata } from './db-log-metadata';
import { DbLog } from './db-log.entity';
interface GenerateLogParams<T> {
    oldValue?: T;
    meta: DbLogMetadata;
}
export declare class DbLoggerService<Entity extends WithId = any> extends BaseFindService<DbLog> {
    constructor(repository: Repository<DbLog>);
    generateLog({ oldValue, meta }: GenerateLogParams<Entity>): DbLog<Entity>;
    store(log: DbLog, action: string, newValue?: Entity): Promise<DbLog>;
}
export {};
