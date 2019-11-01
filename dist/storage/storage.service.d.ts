/// <reference types="node" />
import { ConfigService } from '../config/config.service';
export declare class StorageService {
    private readonly config;
    private client;
    private bucket;
    private logger;
    constructor(config: ConfigService);
    put(file: Buffer, name: string, size: string, _retries?: number): Promise<[string, string]>;
    delete(file: string): Promise<void>;
    deleteWherePrefix(prefix: string): Promise<string[]>;
    private listFiles;
}
