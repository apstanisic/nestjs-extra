import { Module, Global, DynamicModule } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageImagesService } from './storage-images.service';
import { STORAGE_IMAGE_SIZES } from '../consts';
import { defaultStorageImagesSizes } from './storage-images-default-config';

export interface ImageSizeOptions {
  name: string;
  height: number;
  width: number;
  fit: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  quality?: number;
}

export interface StorageOptions {
  imageSizes?: ImageSizeOptions[];
}

/** Even though StorageModule is global, it's imported here just in case */
@Global()
@Module({})
export class StorageModule {
  static forRoot({ imageSizes }: StorageOptions): DynamicModule {
    const sizes = imageSizes || defaultStorageImagesSizes;
    return {
      module: StorageModule,
      providers: [
        { provide: STORAGE_IMAGE_SIZES, useValue: sizes },
        StorageService,
        StorageImagesService,
      ],
      exports: [StorageService, StorageImagesService],
    };
  }
}
