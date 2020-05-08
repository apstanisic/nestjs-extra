/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
export declare class StorageService {
    private readonly config;
    private bucketName;
    private logger;
    private s3;
    _getS3(): S3;
    constructor(config: ConfigService);
    getFile(path: string): Promise<Buffer>;
    put(file: Buffer, path: string): Promise<string>;
    delete(path: string): Promise<any>;
    deleteWherePrefix(prefix: string): Promise<string[]>;
    private listFiles;
}
