import { DynamicModule } from '@nestjs/common';
import { ConfigOptions } from './config/config.module';
import { StorageOptions } from './storage/storage.module';
declare type AvailableModules = 'Mail' | 'Config' | 'AccessControl' | 'Auth' | 'Log' | 'Storage' | 'Notification' | 'Cron';
interface ForRootParams {
    ignore: AvailableModules[];
    config?: ConfigOptions;
    storage: StorageOptions;
}
export declare class CoreModule {
    static forRoot(params: ForRootParams): DynamicModule;
}
export {};
