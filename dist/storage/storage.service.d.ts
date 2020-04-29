/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
export declare class StorageService {
    private readonly config;
    private bucketName;
    private logger;
    private s3;
    constructor(config: ConfigService);
    getFile(key: string): Promise<Buffer>;
    put(file: Buffer, name: string): Promise<string>;
    delete(file: string): Promise<any>;
    deleteWherePrefix(prefix: string): Promise<string[]>;
    private listFiles;
}
