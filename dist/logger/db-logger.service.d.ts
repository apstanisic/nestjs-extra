import { Repository } from 'typeorm';
import { BaseFindService } from '../base-find.service';
import { WithId } from '../types';
import { DbLogMetadata } from './db-log-metadata';
import { DbLog } from './db-log.entity';
export declare class DbLoggerService<T extends WithId = any> extends BaseFindService<DbLog> {
    constructor(repository: Repository<DbLog>);
    generateLog({ oldValue, meta, }: {
        oldValue?: T;
        meta: DbLogMetadata;
    }): DbLog<T>;
    store(log: DbLog, action: string, newValue?: T): Promise<DbLog>;
}
