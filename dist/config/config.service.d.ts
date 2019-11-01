import { Struct } from '../types';
import { ConfigOptions } from './config.module';
export declare class ConfigService {
    private logger;
    private readonly configData?;
    private readonly data;
    constructor(options: ConfigOptions);
    get(key: string): string | undefined;
    getAll(): Struct<String>;
}
