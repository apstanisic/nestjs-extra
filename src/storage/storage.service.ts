import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Client } from 'minio';
import * as AWS from 'aws-sdk';
import { ConfigService } from '../config/config.service';
import {
  STORAGE_ACCESS_KEY,
  STORAGE_BUCKET_NAME,
  STORAGE_GATEWAY,
  STORAGE_ENDPOINT,
  STORAGE_SECRET_KEY,
} from '../consts';
import { wait } from '../helpers';

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

    // AWS.config.
    // const endpoint = new AWS.Endpoint('s3.fr-par.scw.cloud');
    this.s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
      endpoint: endPoint,
    });
    // this.s3.bucket

    this.bucket = bucket;
    this.client = new Client({
      endPoint,
      accessKey,
      secretKey,
      port: 9000,
      useSSL: false,
    });

    // this.s3.putBucketAcl({
    //   Bucket: this.bucket,
    //   ACL: 'public-read',
    // });
    // this.client.setBucketPolicy(
    //   this.bucket,
    //   allowReadPolicy(this.bucket),
    //   err2 => {
    //     if (err2 !== null)
    //       throw new InternalServerErrorException(
    //         `Bucket policy problem: ${err2}`,
    //       );
    //   },
    // );
    // this.client.bucketExists(this.bucket, (err, exist) => {
    //   if (err !== null)
    //     throw new InternalServerErrorException(`Storage problem: ${err}`);

    //   if (!exist) {
    //     this.client.makeBucket(this.bucket, 'us-east-1', err1 => {
    //       if (err !== null) {
    //         throw new InternalServerErrorException(`Storage problem: ${err1}`);
    //       }
    //       this.client.setBucketPolicy(
    //         this.bucket,
    //         allowReadPolicy(this.bucket),
    //         err2 => {
    //           if (err2 !== null)
    //             throw new InternalServerErrorException(
    //               `Bucket policy problem: ${err2}`,
    //             );
    //         },
    //       );
    //     });
    //   }
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
    const filename = `/${this.bucket}/${name}`;
    // aws sdk
    return this.s3
      .putObject({
        Bucket: this.bucket,
        Key: name,
        Body: file,
        ACL: 'public-read',
      })
      .promise()
      .then(data => [filename, size]);
    // minio
    // return new Promise((res: (value: [string, string]) => any, rej): void => {
    //   this.client.putObject(
    //     this.bucket,
    //     name,
    //     file,
    //     // file.byteLength,
    //     // { 'Content-Type': type },
    //     (error: any) => {
    //       // If there is no error, resolve;
    //       if (error === null) return res([filename, size]);

    //       // If it's not 500 error or attempts are out. Reject for good
    //       if (
    //         !(error.code as string).includes('InternalError') ||
    //         _retries === 0
    //       ) {
    //         this.logger.error('B2 non fixable error ');
    //         return rej(error);
    //       }

    //       // If it's 500 and there are more attempts, try this method again
    //       this.logger.warn('B2 returned error, try again. File name:', name);
    //       wait(100).then(() => {
    //         this.put(file, name, size, _retries - 1)
    //           .then(() => res([filename, size]))
    //           .catch(rej);
    //       });
    //     },
    //   );
    // });
  }

  /** Remove one file */
  async delete(file: string): Promise<any> {
    // aws sdk
    return this.s3.deleteObject({ Bucket: this.bucket, Key: file }).promise();
    // minio
    // return new Promise((res, rej): void => {
    //   this.client.removeObject(this.bucket, file, err => {
    //     if (err === null) res();
    //     if (err !== null) rej(err);
    //   });
    // });
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
    // minio
    // const filenames = await this.listFiles(prefix);
    // return new Promise((res, rej): void => {
    //   this.client.removeObjects(this.bucket, filenames, err => {
    //     if (err === null) res(filenames);
    //     if (err !== null) rej();
    //   });
    // });
  }

  /** Lists all files with given path (prefix) */
  private async listFiles(prefix: string): Promise<string[]> {
    // aws sdk
    return this.s3
      .listObjectsV2({ Bucket: this.bucket, Prefix: prefix })
      .promise()
      .then(data => {
        const allKeys = data.Contents?.map(con => con?.Key) ?? [];
        return allKeys.filter(key => key !== undefined) as string[];
        // const keys: string[] = data.Contents?.filter(
        //   c => c.Key !== undefined,
        // ).map(content => content.Key);
      });

    // minio
    // return new Promise((res, rej): void => {
    //   const filenames: string[] = [];
    //   const filesStream = this.client.listObjectsV2(this.bucket, prefix);
    //   filesStream.on('data', filename => filenames.push(filename.name));
    //   filesStream.on('error', rej);
    //   filesStream.on('end', () => res(filenames));
    // });
  }
}
