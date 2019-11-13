import { Module, Global, DynamicModule } from '@nestjs/common';
import { ConfigService } from './config.service';
import { Struct } from '../types';

export const CONFIG_OPTIONS = 'CONFIG_OPTIONS';

// String is file path. Buffer is file. Struct is already parsed file
export interface ConfigOptions {
  data: string | Buffer | Struct<string>;
}

@Global()
@Module({})
export class ConfigModule {
  /** Use .env file if config not provided */
  static forRoot(options?: ConfigOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        ConfigService,
        { provide: CONFIG_OPTIONS, useValue: options },
      ],
      exports: [ConfigService],
    };
  }
}
