import { DynamicModule } from '@nestjs/common';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { AccessControlOptions } from './access-control/access-control.module';
import { DbOptions } from './db/db.module';
import { StorageImageOptions } from './storage-images/storage-images.module';
export interface CoreModuleParams {
    config?: ConfigModuleOptions;
    db: DbOptions;
    useStorage?: boolean;
    useActivityLogger?: boolean;
    useNotifications?: boolean;
    useMq?: boolean;
    useMail?: boolean;
    storageImagesOptions?: StorageImageOptions;
    accessControl?: AccessControlOptions;
}
export declare class CoreModule {
    static forRoot(params: CoreModuleParams): DynamicModule;
}
