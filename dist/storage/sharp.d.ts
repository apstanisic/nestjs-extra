/// <reference types="node" />
import { ImageSizeOptions } from './storage.module';
interface BufferWithSize {
    size: string;
    image: Buffer;
}
export declare function generateAllImageSizes(image: Buffer, sizes: ImageSizeOptions[]): Promise<BufferWithSize[]>;
export {};
