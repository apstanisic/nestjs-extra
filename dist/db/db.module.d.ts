import { DynamicModule } from '@nestjs/common';
import { EntitySchema } from 'typeorm';
import { BaseConnectionOptions } from 'typeorm/connection/BaseConnectionOptions';
export interface DbOptions {
    entities: (Function | string | EntitySchema<any>)[];
    config?: Partial<Omit<BaseConnectionOptions, 'type'>>;
}
export declare class DbModule {
    static forRoot(params: DbOptions): DynamicModule;
}
