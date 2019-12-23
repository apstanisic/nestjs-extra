/// <reference types="node" />
import { ConfigService } from '../config/config.service';
export declare class StorageService {
    private readonly config;
    private bucket;
    private logger;
    private s3;
    constructor(config: ConfigService);
    put(file: Buffer, name: string, size: string, _retries?: number): Promise<[string, string]>;
    delete(file: string): Promise<any>;
    deleteWherePrefix(prefix: string): Promise<string[]>;
    private listFiles;
}
