import { DynamicModule } from '@nestjs/common';
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
export declare class StorageModule {
    static forRoot(options: StorageOptions): DynamicModule;
}
