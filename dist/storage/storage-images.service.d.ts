/// <reference types="node" />
import { StorageService } from './storage.service';
import { ImageSizes, Image } from '../types';
import { ImageSizeOptions } from './storage.module';
export declare class StorageImagesService {
    private readonly storageService;
    private readonly sizes;
    constructor(storageService: StorageService, sizes: ImageSizeOptions[]);
    addImage(image: Buffer): Promise<[ImageSizes, string]>;
    removeImageBySizes(image: ImageSizes): Promise<void>;
    removeImageByPrefix(image: Image): Promise<string[]>;
}
