import { DynamicModule, Global, Module } from '@nestjs/common';
import { STORAGE_IMAGE_SIZES } from '../consts';
import { defaultImagesSizes } from './storage-images-default-config';
import { StorageImagesService } from './storage-images.service';

/**
 * For StorageImagesService to have enough info to store image, this options are needed.
 * There are default opotions, and it's not required to this value be provided
 */
export interface ImageSize {
  name: string;
  height: number;
  width: number;
  fit: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  quality?: number;
}

/** Options for this module */
export interface StorageImageOptions {
  imageSizes?: ImageSize[];
}

/** Even though StorageModule is global, it's imported here just in case */
@Global()
@Module({})
export class StorageImagesModule {
  static forRoot(options?: StorageImageOptions): DynamicModule {
    // Take default size if not provided
    const sizes = options?.imageSizes ?? defaultImagesSizes;
    return {
      module: StorageImagesModule,
      // Provide sizes for DI
      providers: [StorageImagesService, { provide: STORAGE_IMAGE_SIZES, useValue: sizes }],
      exports: [StorageImagesService],
    };
  }
}
