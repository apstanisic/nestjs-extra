import { ImageSizeOptions } from './storage.module';

/** Default values for storing one image in multiple sizes */
export const defaultStorageImagesSizes: ImageSizeOptions[] = [
  {
    name: 'xs',
    height: 128,
    width: 128,
    fit: 'cover',
    quality: 70,
  },
  {
    name: 'sm',
    height: 320,
    width: 320,
    fit: 'inside',
    quality: 70,
  },
  {
    name: 'md',
    height: 640,
    width: 640,
    fit: 'inside',
    quality: 70,
  },
  {
    name: 'lg',
    height: 1280,
    width: 1280,
    fit: 'inside',
    quality: 70,
  },
];
