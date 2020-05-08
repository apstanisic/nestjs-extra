import { DynamicModule } from '@nestjs/common';
export interface ImageSize {
    name: string;
    height: number;
    width: number;
    fit: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
    quality?: number;
}
export interface StorageImageOptions {
    imageSizes?: ImageSize[];
}
export declare class StorageImagesModule {
    static forRoot(options?: StorageImageOptions): DynamicModule;
}
