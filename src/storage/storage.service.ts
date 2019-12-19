import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Client } from 'minio';
import { ConfigService } from '../config/config.service';
import {
  STORAGE_ACCESS_KEY,
  STORAGE_BUCKET_NAME,
  STORAGE_ENDPOINT,
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
  private client: Client;

  /** Bucket name */
  private bucket: string;

  /** Logger */
  private logger = new Logger();
  private s3: AWS.S3;

  constructor(private readonly config: ConfigService) {
    // const endPoint = this.config.get('STORAGE_HOST');
    const endPoint = this.config.get(STORAGE_ENDPOINT);
    const accessKey = this.config.get(STORAGE_ACCESS_KEY);
    const secretKey = this.config.get(STORAGE_SECRET_KEY);
    const bucket = this.config.get(STORAGE_BUCKET_NAME);

    if (!bucket || !endPoint || !accessKey || !secretKey) {
      this.logger.error('Storage mounted, but storage keys are undefined.');
      throw new InternalServerErrorException();
    }

    this.s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
      endpoint: endPoint,
    });

    this.bucket = bucket;
    // this.client = new Client({
    //   endPoint,
    //   accessKey,
    //   secretKey,
    //   port: 9000,
    //   useSSL: false,
    // });
  }

  /**
   * Put file to storage, returns file path.
   * Old minio code is designed for B2, so it has problems with retries
   * If it returns 500, you should attempt to upload again.
   * S3 compatible storage does not have that problem
   */
  async put(
    file: Buffer,
    name: string,
    size: string,
    _retries = 3,
  ): Promise<[string, string]> {
    const filename = name.startsWith('/') ? name : `/${name}`;
    return this.s3
      .putObject({
        Bucket: this.bucket,
        Key: name,
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
  async deleteWherePrefix(prefix: string): Promise<string[] | any> {
    // aws sdk
    const filenames = (await this.listFiles(prefix)).map(Key => ({ Key }));
    return this.s3
      .deleteObjects({
        Bucket: this.bucket,
        Delete: { Objects: [] },
      })
      .promise()
      .then(data => filenames);
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
