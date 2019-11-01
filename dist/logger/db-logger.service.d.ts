import { Repository } from 'typeorm';
import { BaseFindService } from '../base-find.service';
import { WithId } from '../types';
import { LogMetadata } from './log-metadata';
import { Log } from './log.entity';
export declare class DbLoggerService<T extends WithId = any> extends BaseFindService<Log> {
    constructor(repository: Repository<Log>);
    generateLog({ oldValue, meta }: {
        oldValue?: T;
        meta: LogMetadata;
    }): Log<T>;
    store(log: Log, action: string, newValue?: T): Promise<Log>;
}
