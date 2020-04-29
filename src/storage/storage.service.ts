import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
// import { Client } from 'minio';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import {
  STORAGE_ACCESS_KEY,
  STORAGE_BUCKET_NAME,
  STORAGE_ENDPOINT,
  STORAGE_REGION,
  STORAGE_SECRET_KEY,
} from '../consts';

/**
 * This service is wrapper around aws s3 or minio client.
 */
/** Wrapper around aws s3 or minio */
@Injectable()
export class StorageService {
  /** Bucket name */
  private bucketName: string;

  /** Logger */
  private logger = new Logger();

  /** S3 bucket */
  private s3: S3;

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

    this.bucketName = bucket;
    this.s3 = new S3({
      region,
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
      endpoint: endPoint,
    });
  }

  /**
   * Upload file to s3 compatible storage.
   * Path can't begin with a /. It should be folder1/folder2/name.ext
   * Returns filename
   */
  async put(file: Buffer, name: string): Promise<string> {
    const filename = name.startsWith('/') ? name.substr(1) : name;

    return this.s3
      .putObject({
        Bucket: this.bucketName,
        Key: filename,
        Body: file,
        ACL: 'public-read',
      })
      .promise()
      .then((res) => filename);
  }

  /** Remove one file */
  async delete(file: string): Promise<any> {
    return this.s3.deleteObject({ Bucket: this.bucketName, Key: file }).promise();
  }

  /**
   * Deletes many files. Useful when images are stored in many sizes.
   * If all images sizes are 2019/05/22/qwer12.xs.jpeg, prefixfor them is 2019/05/22/qwer12.
   */
  async deleteWherePrefix(prefix: string): Promise<string[]> {
    const filenames = (await this.listFiles(prefix)).map((Key) => ({ Key }));

    return this.s3
      .deleteObjects({
        Bucket: this.bucketName,
        Delete: { Objects: filenames },
      })
      .promise()
      .then((data) => filenames.map((f) => f.Key));
  }

  /** Lists all files with given path (prefix) */
  private async listFiles(prefix: string): Promise<string[]> {
    return this.s3
      .listObjectsV2({ Bucket: this.bucketName, Prefix: prefix })
      .promise()
      .then((data) => {
        const allKeys = data.Contents?.map((con) => con?.Key) ?? [];
        return allKeys.filter((key) => key !== undefined) as string[];
      });
  }
}
