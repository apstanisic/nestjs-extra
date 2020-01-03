import { DynamicModule } from '@nestjs/common';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { AcOptions } from './access-control/access-control.module';
import { DbOptions } from './db/db.module';
import { StorageOptions } from './storage/storage.module';
export interface CoreModuleParams {
    config?: ConfigModuleOptions;
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
