import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Client } from 'minio';
import { ConfigService } from '../config/config.service';
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

  constructor(private readonly config: ConfigService) {
    const endPoint = this.config.get('STORAGE_HOST');
    const accessKey = this.config.get('STORAGE_ACCESS_KEY');
    const secretKey = this.config.get('STORAGE_SECRET_KEY');
    const bucket = this.config.get('STORAGE_BUCKET_NAME');

    if (!bucket || !endPoint || !accessKey || !secretKey) {
      this.logger.error('Storage mounted, but storage keys are undefined.');
      throw new InternalServerErrorException();
    }

    this.bucket = bucket;
    this.client = new Client({
      endPoint,
      accessKey,
      secretKey,
      port: 9000,
      useSSL: false,
    });
  }

  /**
   * Put file to storage, returns file path.
   * B2 offten returns 500. In that case just try again couple of times.
   * It must be recursive, there is not better way.
   * Don't touch this code unles you have to, it's B2's fault.
   * B2 sucks, but it's cheapest file hosting. In case of switch to
   * S3 or Wasabi, remove recursion, as it's not needed.
   * Avoid changing number of attempts, it's there for recursion.
   */
  async put(
    file: Buffer,
    name: string,
    size: string,
    _retries = 3,
  ): Promise<[string, string]> {
    const filename = `/${this.bucket}/${name}`;
    return new Promise((res: (value: [string, string]) => any, rej): void => {
      this.client.putObject(
        this.bucket,
        name,
        file,
        // file.byteLength,
        // { 'Content-Type': type },
        (error: any) => {
          // If there is no error, resolve;
          if (error === null) return res([filename, size]);

          // If it's not 500 error or attempts are out. Reject for good
          if (
            !(error.code as string).includes('InternalError') ||
            _retries === 0
          ) {
            this.logger.error('B2 non fixable error ');
            return rej(error);
          }

          // If it's 500 and there are more attempts, try this method again
          this.logger.warn('B2 returned error, try again. File name:', name);
          wait(100).then(() => {
            this.put(file, name, size, _retries - 1)
              .then(() => res([filename, size]))
              .catch(rej);
          });
        },
      );
    });
  }

  /** Remove one file */
  async delete(file: string): Promise<void> {
    return new Promise((res, rej): void => {
      this.client.removeObject(this.bucket, file, err => {
        if (err === null) res();
        if (err !== null) rej(err);
      });
    });
  }

  /**
   * Deletes many files.
   * Useful when images are stored in many sizes
   * If all images sizes are 2019/05/22/qwer12.xs.jpeg,
   * @param prefix for them is 2019/05/22/qwer12.
   */
  async deleteWherePrefix(prefix: string): Promise<string[]> {
    const filenames = await this.listFiles(prefix);

    return new Promise((res, rej): void => {
      this.client.removeObjects(this.bucket, filenames, err => {
        if (err === null) res(filenames);
        if (err !== null) rej();
      });
    });
  }

  /** Lists all files with given path (prefix) */
  private async listFiles(prefix: string): Promise<string[]> {
    return new Promise((res, rej): void => {
      const filenames: string[] = [];
      const filesStream = this.client.listObjectsV2(this.bucket, prefix);
      filesStream.on('data', filename => filenames.push(filename.name));
      filesStream.on('error', rej);
      filesStream.on('end', () => res(filenames));
    });
  }
}
