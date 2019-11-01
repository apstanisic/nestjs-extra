import { DynamicModule } from '@nestjs/common';
import { ConfigOptions } from './config/config.module';
import { StorageOptions } from './storage/storage.module';
import { DbOptions } from './db/db.module';
declare type AvailableModules = 'Mail' | 'Config' | 'AccessControl' | 'Auth' | 'Log' | 'Storage' | 'Notification' | 'Cron';
interface ForRootParams {
    ignore: AvailableModules[];
    config?: ConfigOptions;
    storage: StorageOptions;
    db: DbOptions;
}
export declare class CoreModule {
    static forRoot(params: ForRootParams): DynamicModule;
}
export {};
