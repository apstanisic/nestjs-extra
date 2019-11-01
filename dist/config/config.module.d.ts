/// <reference types="node" />
import { DynamicModule } from '@nestjs/common';
export declare const CONFIG_OPTIONS = "CONFIG_OPTIONS";
export interface ConfigOptions {
    configData?: string | Buffer;
}
export declare class ConfigModule {
    static forRoot(options?: ConfigOptions): DynamicModule;
}
