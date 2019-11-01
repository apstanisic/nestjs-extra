/// <reference types="node" />
import { DynamicModule } from '@nestjs/common';
import { Struct } from '../types';
export declare const CONFIG_OPTIONS = "CONFIG_OPTIONS";
export interface ConfigOptions {
    configs: string | Buffer | Struct<string>;
}
export declare class ConfigModule {
    static forRoot(options?: ConfigOptions): DynamicModule;
}
