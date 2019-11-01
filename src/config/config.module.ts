import { Module, Global, DynamicModule } from '@nestjs/common';
import { ConfigService } from './config.service';

export const CONFIG_OPTIONS = 'CONFIG_OPTIONS';

export interface ConfigOptions {
  configData?: string | Buffer;
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
