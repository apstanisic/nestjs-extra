import { DynamicModule } from '@nestjs/common';
export interface DbOptions {
    entities: any[];
    usingAccessControl: boolean;
}
export declare class DbModule {
    static forRoot(params: DbOptions): DynamicModule;
}
