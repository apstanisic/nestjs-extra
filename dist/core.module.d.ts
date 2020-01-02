/// <reference types="node" />
import { DynamicModule } from '@nestjs/common';
import { AcOptions } from './access-control/access-control.module';
import { DbOptions } from './db/db.module';
import { StorageOptions } from './storage/storage.module';
import { Struct } from './types';
interface ConfigOptions {
    data: string | Buffer | Struct<string>;
}
export interface CoreModuleParams {
    config?: ConfigOptions;
    storage: StorageOptions | false;
    db: DbOptions;
    accessControl?: AcOptions;
    dbLog: boolean;
    notifications: boolean;
    mail: boolean;
}
export declare class CoreModule {
    static forRoot(params: CoreModuleParams): DynamicModule;
}
export {};
