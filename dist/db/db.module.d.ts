import { DynamicModule } from '@nestjs/common';
export interface DbOptions {
    entities: any[];
    config?: Record<string, any>;
}
export declare class DbModule {
    static forRoot(params: DbOptions): DynamicModule;
}
