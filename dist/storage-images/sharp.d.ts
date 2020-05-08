/// <reference types="node" />
import { ImageSize } from './storage-images.module';
interface BufferWithSize {
    size: string;
    image: Buffer;
}
export declare function generateAllImageSizes(image: Buffer, sizes: ImageSize[]): Promise<BufferWithSize[]>;
export {};
