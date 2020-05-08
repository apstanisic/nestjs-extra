import { DynamicModule, Global, Module } from '@nestjs/common';
import { StorageService } from './storage.service';

/**
 * Storage module
 * Provides wrapper around s3 methods
 */
@Global()
@Module({})
export class StorageModule {
  static forRoot(): DynamicModule {
    return {
      module: StorageModule,
      providers: [StorageService],
      exports: [StorageService],
    };
  }
}
