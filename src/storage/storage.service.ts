import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
// import { Client } from 'minio';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import {
  STORAGE_ACCESS_KEY,
  STORAGE_BUCKET_NAME,
  STORAGE_ENDPOINT,
  STORAGE_REGION,
  STORAGE_SECRET_KEY,
} from '../consts';

/**
 * This service is wrapper around minio client.
 * We are using cb and wrap them in promise cause AWS SDK does not contain
 * promises nativly. We should be able to replace minio with AWS without
 * changing underlying api.
 */
@Injectable()
export class StorageService {
  /** Client that stores files */
  // private client: Client;

  /** Bucket name */
  private bucket: string;

  /** Logger */
  private logger = new Logger();
  private s3: AWS.S3;

  constructor(private readonly config: ConfigService) {
    // const endPoint = this.config.get('STORAGE_HOST');
    const endPoint = this.config.get(STORAGE_ENDPOINT);
    const region = this.config.get(STORAGE_REGION);
    const accessKey = this.config.get(STORAGE_ACCESS_KEY);
    const secretKey = this.config.get(STORAGE_SECRET_KEY);
    const bucket = this.config.get(STORAGE_BUCKET_NAME);

    if (!bucket || !endPoint || !accessKey || !secretKey || !region) {
      this.logger.error('Storage mounted, but storage keys are undefined.');
      throw new InternalServerErrorException();
    }

    this.bucket = bucket;
    this.s3 = new AWS.S3({
      // apiVersion: '2006-03-01',
      region,
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
      endpoint: endPoint,
    });
  }

  /**
   * Upload file to s3 compatible storage
   */
  async put(file: Buffer, name: string, size: string, _retries = 3): Promise<[string, string]> {
    // Path can't start with /. It should be folder1/folder2/name.ext
    const filename = name.startsWith('/') ? name.substr(1) : name;

    return this.s3
      .putObject({
        Bucket: this.bucket,
        Key: filename,
        Body: file,
        ACL: 'public-read',
      })
      .promise()
      .then(data => [filename, size]);
  }

  /** Remove one file */
  async delete(file: string): Promise<any> {
    return this.s3.deleteObject({ Bucket: this.bucket, Key: file }).promise();
  }

  /**
   * Deletes many files.
   * Useful when images are stored in many sizes
   * If all images sizes are 2019/05/22/qwer12.xs.jpeg,
   * @param prefix for them is 2019/05/22/qwer12.
   */
  async deleteWherePrefix(prefix: string): Promise<string[]> {
    // aws sdk
    const filenames = (await this.listFiles(prefix)).map(Key => ({ Key }));
    return this.s3
      .deleteObjects({
        Bucket: this.bucket,
        Delete: { Objects: [] },
      })
      .promise()
      .then(data => filenames.map(f => f.Key));
  }

  /** Lists all files with given path (prefix) */
  private async listFiles(prefix: string): Promise<string[]> {
    return this.s3
      .listObjectsV2({ Bucket: this.bucket, Prefix: prefix })
      .promise()
      .then(data => {
        const allKeys = data.Contents?.map(con => con?.Key) ?? [];
        return allKeys.filter(key => key !== undefined) as string[];
      });
  }
}
