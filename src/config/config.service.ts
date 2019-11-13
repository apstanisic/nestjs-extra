import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  Optional,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { Struct } from '../types';
import { ConfigOptions, CONFIG_OPTIONS } from './config.module';

@Injectable()
export class ConfigService {
  /** Logger */
  private logger = new Logger('ConfigModule');

  /** Don't access this property. Use data getter */
  private readonly configData?: Struct<string>;

  private get data(): Struct<string> {
    if (this.configData === undefined) {
      this.logger.error('Module does not have valid properties');
      throw new InternalServerErrorException();
    }
    return this.configData;
  }

  /** Use .env file if config not provided */
  constructor(@Optional() @Inject(CONFIG_OPTIONS) options?: ConfigOptions) {
    try {
      if (options) {
        const { data } = options;
        // if (typeof options.configs === 'object')
        if (Buffer.isBuffer(data) || typeof data === 'string') {
          this.configData = dotenv.parse(data);
        } else {
          this.configData = { ...data };
        }
      } else {
        const file = readFileSync('.env');
        this.configData = dotenv.parse(file);
      }
    } catch (error) {
      this.logger.log('ConfigService was not initialized.');
      // Ignore error if we can't init module.
      // Throw error only when module is used.
      // This is good because when we start project, we might not need
      // ConfigService, but we don't explicitly ignore him, so throw error
      // only when its in use
    }
  }

  /** Get specified value from config */
  get(key: string): string | undefined {
    return this.data[key];
  }

  /** Get all values from config */
  getAll(): Struct<string> {
    return this.data;
  }
}
