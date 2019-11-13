import { DynamicModule } from '@nestjs/common';
import { ConfigOptions } from './config/config.module';
import { DbOptions } from './db/db.module';
import { StorageOptions } from './storage/storage.module';
import { AcOptions } from './access-control/access-control.module';
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
