import { Struct } from '../types';
import { ConfigOptions } from './config.module';
export declare class ConfigService {
    private logger;
    private readonly configData?;
    private get data();
    constructor(options?: ConfigOptions);
    get(key: string): string | undefined;
    getAll(): Struct<string>;
}
