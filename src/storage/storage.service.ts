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
 * This service is wrapper around aws s3 sdk.
 * It can be used for any s3 compatible storage, including minio
 */
@Injectable()
export class StorageService {
  /** Bucket name */
  private bucketName: string;

  /** Logger */
  private logger = new Logger(StorageService.name);

  /** S3 bucket */
  private s3: S3;

  /**
   * Returns s3 instance, use only for debuging.
   */
  public _getS3(): S3 {
    return this.s3;
  }

  constructor(private readonly config: ConfigService) {
    const endPoint = this.config.get(STORAGE_ENDPOINT);
    const region = this.config.get(STORAGE_REGION);
    const accessKey = this.config.get(STORAGE_ACCESS_KEY);
    const secretKey = this.config.get(STORAGE_SECRET_KEY);
    const bucket = this.config.get(STORAGE_BUCKET_NAME);

    if (!bucket || !endPoint || !accessKey || !secretKey || !region) {
      this.logger.error('Not all required values are provided.');
      throw new InternalServerErrorException('Storage is not working');
    }

    // Bucket must be provided every time
    this.bucketName = bucket;
    this.s3 = new S3({
      region,
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
      endpoint: endPoint,
    });
  }

  /**
   * Get file buffer from s3 bucket
   */
  async getFile(path: string): Promise<Buffer> {
    const file = await this.s3
      .getObject({
        Key: path,
        Bucket: this.bucketName,
      })
      .promise()
      .then((res) => res.Body as Buffer)
      .catch((e) => {
        this.logger.error(e);
        throw new InternalServerErrorException('Error getting file');
      });
    return file;
  }

  /**
   * Upload file to s3 compatible storage.
   * Path can't begin with a /. It should be folder1/folder2/name.ext
   * For now all created files are public
   * Returns filename
   */
  async put(file: Buffer, path: string): Promise<string> {
    const validPath = path.startsWith('/') ? path.substr(1) : path;

    return this.s3
      .putObject({
        Bucket: this.bucketName,
        Key: validPath,
        Body: file,
        ACL: 'public-read',
      })
      .promise()
      .then((res) => validPath);
  }

  /**
   * Remove one file
   */
  async delete(path: string): Promise<any> {
    return this.s3.deleteObject({ Bucket: this.bucketName, Key: path }).promise();
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

  /**
   * Lists all files with given path (prefix)
   */
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
